import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicRoot = path.join(root, "public");
const manifestPath = path.join(root, "versions.json");
const requiredFiles = [
  "index.html",
  "versoes/index.html",
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
const versionsHtml = await readFile(
  path.join(publicRoot, "versoes", "index.html"),
  "utf8"
);
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
const packageDocument = JSON.parse(
  await readFile(path.join(root, "package.json"), "utf8")
);
const css = await readFile(path.join(publicRoot, "styles.css"), "utf8");
const htmlFiles = publicFiles.filter((file) => path.extname(file) === ".html");
const localReferences = new Set();
for (const htmlFile of htmlFiles) {
  const page = await readFile(htmlFile, "utf8");
  const references = [...page.matchAll(/(?:src|href|srcset)="([^"#?]+)"/g)]
    .map((match) => match[1])
    .filter((reference) =>
      !reference.endsWith("/") &&
      !reference.startsWith("http://") &&
      !reference.startsWith("https://") &&
      !reference.startsWith("mailto:")
  );
  for (const reference of references) {
    const resolved = reference.startsWith("/backuphub/")
      ? path.resolve(publicRoot, reference.slice("/backuphub/".length))
      : path.resolve(path.dirname(htmlFile), reference);
    if (!resolved.startsWith(`${publicRoot}${path.sep}`)) {
      throw new Error(`Referência fora de public: ${reference}`);
    }
    await access(resolved);
    localReferences.add(path.relative(publicRoot, resolved));
  }
}

const versionPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
if (!versionPattern.test(manifest.currentVersion)) {
  throw new Error("Versão atual inválida no manifesto.");
}
if (manifest.currentVersion !== packageDocument.version) {
  throw new Error("Manifesto de versões diverge do package.json.");
}
if (!Array.isArray(manifest.versions) || manifest.versions.length === 0) {
  throw new Error("O manifesto precisa conter ao menos uma versão.");
}

const currentVersions = manifest.versions.filter(
  (version) => version.version === manifest.currentVersion
);
if (currentVersions.length !== 1) {
  throw new Error("O manifesto deve possuir exatamente uma versão atual.");
}
const currentVersion = currentVersions[0];
if (!currentVersion.download) {
  throw new Error("A versão atual precisa oferecer o download oficial.");
}
for (const version of manifest.versions) {
  if (!versionPattern.test(version.version)) {
    throw new Error(`Versão inválida no manifesto: ${version.version}`);
  }
  if (
    version.version !== manifest.currentVersion &&
    (version.download || version.releaseUrl)
  ) {
    throw new Error(`Versão histórica não pode oferecer download: ${version.version}`);
  }
}

const sortedVersions = [...manifest.versions].sort((left, right) => {
  const leftParts = left.version.split(".").map(Number);
  const rightParts = right.version.split(".").map(Number);
  for (let index = 0; index < 3; index += 1) {
    if (leftParts[index] !== rightParts[index]) {
      return rightParts[index] - leftParts[index];
    }
  }
  return 0;
});
if (
  sortedVersions.some(
    (version, index) => version.version !== manifest.versions[index].version
  ) || sortedVersions[0].version !== manifest.currentVersion
) {
  throw new Error("As versões devem estar em ordem decrescente, com a atual primeiro.");
}

const expectedAssetUrl =
  `https://github.com/Rodrigodil/backuphub/releases/download/v${manifest.currentVersion}/` +
  `BackupHub-${manifest.currentVersion}-win-x64.zip`;
if (
  currentVersion.download.url !== expectedAssetUrl ||
  currentVersion.download.file !== `BackupHub-${manifest.currentVersion}-win-x64.zip` ||
  !Number.isSafeInteger(currentVersion.download.size) ||
  currentVersion.download.size <= 0 ||
  !/^[A-F0-9]{64}$/.test(currentVersion.download.sha256)
) {
  throw new Error("Metadados do ZIP atual são inválidos ou inconsistentes.");
}

const versionCards = [...versionsHtml.matchAll(/\bdata-version="([^"]+)"/g)]
  .map((match) => match[1]);
if (
  versionCards.length !== manifest.versions.length ||
  manifest.versions.some((version) => !versionCards.includes(version.version))
) {
  throw new Error("A página não representa todas as versões do manifesto.");
}
const currentDownloads = [...versionsHtml.matchAll(
  /<a\b(?=[^>]*\bdata-current-download\b)[^>]*>/g
)].map((match) => match[0]);
if (
  currentDownloads.length !== 2 ||
  currentDownloads.some((link) =>
    !link.includes(`href="${currentVersion.download.url}"`) ||
    !link.includes('rel="noopener noreferrer"')
  ) ||
  !versionsHtml.includes("data-current-version") ||
  !versionsHtml.includes('aria-current="page"')
) {
  throw new Error("Download atual ou estado de navegação inválido na página de versões.");
}
if (
  (html.match(/href="\.\/versoes\/"/g) ?? []).length !== 2 ||
  !versionsHtml.includes(
    '<link rel="canonical" href="https://rodrigodil.github.io/backuphub/versoes/">'
  )
) {
  throw new Error("Menu, rodapé ou canonical da página de versões está incompleto.");
}
const sitemap = await readFile(path.join(publicRoot, "sitemap.xml"), "utf8");
if (!sitemap.includes("https://rodrigodil.github.io/backuphub/versoes/")) {
  throw new Error("A página de versões não está no sitemap.");
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
const currentAppVersion = "1.1.1";
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
  `Site validado: ${publicFiles.length} arquivos públicos, ${localReferences.size} referências locais e ${manifest.versions.length} versões.`
);
