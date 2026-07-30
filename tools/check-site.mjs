import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const requiredFiles = [
  "index.html",
  "404.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "assets/backuphub.ico",
  "assets/favicon-32.png",
  "assets/icon-96.png",
  "assets/icon-180.png",
  "assets/og-backuphub.png"
];
const forbiddenTerms = [
  "Projetos-Workspace",
  "Sistemas-KS",
  "Meu Drive",
  "mariadb-local-ks",
  "MariaDB local KS"
];

for (const file of requiredFiles) {
  await access(path.join(publicRoot, file));
}

async function walk(directory) {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry);
    const metadata = await stat(absolute);
    if (metadata.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else {
      files.push(absolute);
    }
  }

  return files;
}

const publicFiles = await walk(publicRoot);
const textFiles = publicFiles.filter((file) =>
  [".html", ".css", ".js", ".txt", ".xml", ".json"].includes(path.extname(file))
);

for (const file of textFiles) {
  const content = await readFile(file, "utf8");
  for (const term of forbiddenTerms) {
    if (content.includes(term)) {
      throw new Error(`Conteúdo interno encontrado em ${path.relative(root, file)}.`);
    }
  }
}

const html = await readFile(path.join(publicRoot, "index.html"), "utf8");
const references = [...html.matchAll(/(?:src|href|srcset)="\.\/([^"#?]+)"/g)]
  .map((match) => match[1])
  .filter((reference) => !reference.endsWith("/"));

for (const reference of new Set(references)) {
  await access(path.join(publicRoot, reference));
}

const releaseUrl = "https://github.com/Rodrigodil/backuphub/releases/latest";
const currentAppVersion = "1.0.0";
const downloadLinks = [...html.matchAll(
  /<a\b(?=[^>]*\bdata-download-link\b)[^>]*>/g
)].map((match) => match[0]);
if (downloadLinks.length !== 2) {
  throw new Error("Devem existir dois CTAs oficiais de download.");
}
for (const link of downloadLinks) {
  if (
    !link.includes(`href="${releaseUrl}"`) ||
    !link.includes('target="_blank"') ||
    !link.includes('rel="noopener noreferrer"')
  ) {
    throw new Error("CTA de download sem URL ou proteção esperada.");
  }
}

const headerDownload = downloadLinks.find((link) =>
  link.includes("header-download")
);
if (
  !headerDownload ||
  !headerDownload.includes(`data-app-version="${currentAppVersion}"`) ||
  !headerDownload.includes(
    `aria-label="Baixar BackupHub versão ${currentAppVersion}"`
  ) ||
  !html.includes(`<small>Versão ${currentAppVersion}</small>`)
) {
  throw new Error("O CTA do cabeçalho não informa a versão atual.");
}

if (
  !html.includes("data-contribution") ||
  !/<button\b(?=[^>]*\bdata-contribution\b)(?=[^>]*\bdisabled\b)/.test(html)
) {
  throw new Error("O CTA de contribuição deve permanecer desabilitado.");
}

console.log(
  `Site validado: ${publicFiles.length} arquivos públicos e ${new Set(references).size} referências locais.`
);
