import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(projectRoot, "public");
const host = "127.0.0.1";
const requestedPort = Number.parseInt(process.env.PORT ?? "4173", 10);
const port = Number.isInteger(requestedPort)
  && requestedPort > 0
  && requestedPort <= 65535
  ? requestedPort
  : 4173;

const contentTypes = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"]
]);

function sendText(response, statusCode, message, extraHeaders = {}) {
  response.writeHead(statusCode, {
    "Content-Type": "text/plain; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    ...extraHeaders
  });
  response.end(message);
}

function sendFile(request, response, filePath, statusCode, metadata) {
  response.writeHead(statusCode, {
    "Cache-Control": "no-store",
    "Content-Length": metadata.size,
    "Content-Type": contentTypes.get(path.extname(filePath).toLowerCase())
      ?? "application/octet-stream",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff"
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(filePath).pipe(response);
}

async function resolvePublicFile(requestUrl) {
  const url = new URL(requestUrl, `http://${host}:${port}`);
  let pathname = decodeURIComponent(url.pathname);

  // Simula também o caminho final do GitHub Pages.
  if (pathname === "/backuphub" || pathname.startsWith("/backuphub/")) {
    pathname = pathname.slice("/backuphub".length) || "/";
  }

  const relativePath = pathname
    .replaceAll("\\", "/")
    .replace(/^\/+/, "");
  const candidate = path.resolve(publicRoot, relativePath || "index.html");
  const publicPrefix = `${publicRoot}${path.sep}`;

  if (candidate !== publicRoot && !candidate.startsWith(publicPrefix)) {
    return null;
  }

  try {
    const metadata = await stat(candidate);
    if (metadata.isDirectory()) {
      const indexPath = path.join(candidate, "index.html");
      return { filePath: indexPath, metadata: await stat(indexPath) };
    }
    return { filePath: candidate, metadata };
  } catch {
    return null;
  }
}

const server = createServer(async (request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method ?? "")) {
    sendText(response, 405, "Método não permitido.", { "Allow": "GET, HEAD" });
    return;
  }

  try {
    const resolved = await resolvePublicFile(request.url);
    if (resolved) {
      sendFile(request, response, resolved.filePath, 200, resolved.metadata);
      return;
    }

    const notFoundPath = path.join(publicRoot, "404.html");
    sendFile(request, response, notFoundPath, 404, await stat(notFoundPath));
  } catch (error) {
    if (error instanceof URIError) {
      sendText(response, 400, "Endereço inválido.");
      return;
    }

    sendText(response, 500, "Falha ao servir o site localmente.");
  }
});

server.listen(port, host, () => {
  console.log("");
  console.log("BackupHub disponível em:");
  console.log(`  Local:  http://localhost:${port}`);
  console.log(`  Pages:  http://localhost:${port}/backuphub/`);
  console.log("");
  console.log("Pressione Ctrl+C para encerrar.");
});

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`A porta ${port} já está em uso. Tente: $env:PORT=4174; npm run dev`);
    process.exitCode = 1;
    return;
  }

  throw error;
});

function shutdown() {
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
