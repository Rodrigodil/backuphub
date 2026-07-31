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
const css = await readFile(path.join(publicRoot, "styles.css"), "utf8");
const references = [...html.matchAll(/(?:src|href|srcset)="\.\/([^"#?]+)"/g)]
  .map((match) => match[1])
  .filter((reference) => !reference.endsWith("/"));

for (const reference of new Set(references)) {
  await access(path.join(publicRoot, reference));
}

if (
  !/\.showcase-preview img\s*\{[^}]*height:\s*auto;/s.test(css) ||
  /height:\s*(?:min\(46vw,\s*380px\)|438px);/.test(css) ||
  !/\.showcase-selector img\s*\{[^}]*object-fit:\s*contain;/s.test(css)
) {
  throw new Error(
    "Capturas da vitrine devem permanecer inteiras no painel e nas miniaturas."
  );
}

const releaseUrl = "https://github.com/Rodrigodil/backuphub/releases/latest";
const currentAppVersion = "1.1.0";
// Integração temporária: ao trocar a conta Stripe, atualizar este contrato,
// os dois hrefs em public/index.html e o QR Code público na mesma entrega.
const temporaryContributionUrl =
  "https://donate.stripe.com/28E5kD8OH7fV6dW7I6cEw00";
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
  html.includes("Ver documentação do site") ||
  html.includes("Repositório do site") ||
  html.includes('href="https://github.com/Rodrigodil/backuphub"')
) {
  throw new Error("O site não deve expor um link direto para seu repositório.");
}

const linkedInUrl = "https://www.linkedin.com/in/rodrigochiste/";
const linkedInLinks = [...html.matchAll(
  /<a\b(?=[^>]*href="https:\/\/www\.linkedin\.com\/in\/rodrigochiste\/")[^>]*>LinkedIn<\/a>/g
)];
if (
  linkedInLinks.length !== 1 ||
  !linkedInLinks[0][0].includes('rel="me noopener"')
) {
  throw new Error("O rodapé deve conter o LinkedIn oficial do autor.");
}

const contributionLinks = [...html.matchAll(
  /<a\b(?=[^>]*\bdata-contribution-(?:link|qr)\b)[^>]*>/g
)].map((match) => match[0]);
if (contributionLinks.length !== 2) {
  throw new Error("Devem existir o CTA e o QR Code de apoio.");
}
for (const link of contributionLinks) {
  if (
    !link.includes(`href="${temporaryContributionUrl}"`) ||
    !link.includes('target="_blank"') ||
    !link.includes('rel="noopener noreferrer external"') ||
    !link.includes('referrerpolicy="no-referrer"')
  ) {
    throw new Error("Link de apoio fora do contrato temporário aprovado.");
  }
}

if (
  html.includes("js.stripe.com") ||
  html.includes("<stripe-buy-button") ||
  html.includes("publishable-key") ||
  html.includes("pk_live_") ||
  html.includes("sk_live_")
) {
  throw new Error("A página pública não deve incorporar Stripe.js ou chaves.");
}

console.log(
  `Site validado: ${publicFiles.length} arquivos públicos e ${new Set(references).size} referências locais.`
);
