import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "versions.json");
const outputPath = path.join(root, "public", "versoes", "index.html");
const checkOnly = process.argv.includes("--check");

const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    timeZone: "UTC",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00Z`));
}

function formatBytes(value) {
  const mebibytes = value / 1024 / 1024;
  return `${new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(mebibytes)} MiB (${new Intl.NumberFormat("pt-BR").format(value)} bytes)`;
}

const current = manifest.versions.find(
  (version) => version.version === manifest.currentVersion
);

if (!current?.download) {
  throw new Error("A versão atual precisa conter o download oficial.");
}

const history = manifest.versions.filter(
  (version) => version.version !== manifest.currentVersion
);

function changesList(version) {
  return version.changes
    .map((change) => `<li>${escapeHtml(change)}</li>`)
    .join("\n                  ");
}

const historicalCards = history
  .map(
    (version) => `
            <article class="version-card version-card-history" data-version="${escapeHtml(version.version)}">
              <div class="version-card-heading">
                <div>
                  <p class="version-status">Versão histórica</p>
                  <h2>BackupHub ${escapeHtml(version.version)}</h2>
                </div>
                <time datetime="${escapeHtml(version.publishedAt)}">${escapeHtml(formatDate(version.publishedAt))}</time>
              </div>
              <h3>${escapeHtml(version.title)}</h3>
              <p>${escapeHtml(version.summary)}</p>
              <ul class="version-changes">
                ${changesList(version)}
              </ul>
            </article>`
  )
  .join("\n");

const canonical = "https://rodrigodil.github.io/backuphub/versoes/";
const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Versões do BackupHub",
  url: canonical,
  mainEntity: manifest.versions.map((version) => ({
    "@type": "SoftwareApplication",
    name: `BackupHub ${version.version}`,
    datePublished: version.publishedAt,
    operatingSystem: "Windows 11 x64"
  }))
});

const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#07152b">
    <meta name="color-scheme" content="light">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    <title>Versões do BackupHub — histórico e download oficial</title>
    <meta name="description" content="Histórico público das versões do BackupHub e download direto da versão estável mais recente para Windows 11 x64.">
    <link rel="canonical" href="${canonical}">
    <link rel="icon" href="../assets/backuphub.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/favicon-32.png">
    <link rel="apple-touch-icon" href="../assets/icon-180.png">
    <link rel="stylesheet" href="../styles.css">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="BackupHub">
    <meta property="og:title" content="Versões do BackupHub">
    <meta property="og:description" content="Histórico de versões e download direto da versão estável mais recente.">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="https://rodrigodil.github.io/backuphub/assets/og-backuphub.png">
    <meta property="og:image:alt" content="BackupHub — backups organizados, íntegros e auditáveis">
    <meta name="twitter:card" content="summary_large_image">
    <script type="application/ld+json">${jsonLd}</script>
    <script src="../script.js" defer></script>
  </head>
  <body>
    <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header class="site-header" data-header>
      <div class="container header-content">
        <a class="brand" href="../" aria-label="BackupHub — início">
          <img src="../assets/icon-96.png" width="48" height="48" alt="">
          <span class="brand-name">Backup<span>Hub</span></span>
        </a>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="menu-principal" aria-label="Abrir menu" data-menu-toggle>
          <span></span><span></span><span></span>
        </button>
        <nav class="main-nav" id="menu-principal" aria-label="Navegação principal" data-menu>
          <a href="../#recursos">Recursos</a>
          <a href="../#interface">Interface</a>
          <a href="../#seguranca">Segurança</a>
          <a href="./" aria-current="page">Versões</a>
          <a class="button button-small header-download" href="${escapeHtml(current.download.url)}" target="_blank" rel="noopener noreferrer" data-current-download data-app-version="${escapeHtml(current.version)}" aria-label="Baixar BackupHub versão ${escapeHtml(current.version)}">
            <span class="header-download-icon" aria-hidden="true">↓</span>
            <span class="header-download-copy"><strong>Baixar</strong><small>Versão ${escapeHtml(current.version)}</small></span>
          </a>
        </nav>
      </div>
    </header>

    <main id="conteudo" class="versions-page">
      <section class="versions-hero" aria-labelledby="versions-title">
        <div class="container versions-hero-grid">
          <div>
            <p class="eyebrow"><span aria-hidden="true"></span>Histórico público</p>
            <h1 id="versions-title">Versões do BackupHub</h1>
            <p>Consulte a evolução do aplicativo e baixe somente a versão estável mais recente, acompanhada de tamanho e SHA-256 verificáveis.</p>
          </div>
          <div class="versions-count" role="group" aria-label="Resumo do histórico">
            <strong>${manifest.versions.length}</strong>
            <span>versões publicadas</span>
          </div>
        </div>
      </section>

      <section class="container versions-catalog" aria-labelledby="latest-version-title">
        <article class="version-card version-card-current" data-version="${escapeHtml(current.version)}" data-current-version>
          <div class="version-card-heading">
            <div>
              <p class="version-status version-status-current">Versão mais recente</p>
              <h2 id="latest-version-title">BackupHub ${escapeHtml(current.version)}</h2>
            </div>
            <time datetime="${escapeHtml(current.publishedAt)}">${escapeHtml(formatDate(current.publishedAt))}</time>
          </div>
          <div class="current-version-grid">
            <div>
              <h3>${escapeHtml(current.title)}</h3>
              <p>${escapeHtml(current.summary)}</p>
              <ul class="version-changes">
                ${changesList(current)}
              </ul>
            </div>
            <aside class="current-download" aria-label="Download oficial da versão ${escapeHtml(current.version)}">
              <p class="download-platform">Windows 11 x64</p>
              <a class="button button-primary version-download" href="${escapeHtml(current.download.url)}" target="_blank" rel="noopener noreferrer" data-current-download>
                <span>Baixar versão ${escapeHtml(current.version)}</span>
                <small>${escapeHtml(current.download.file)}</small>
              </a>
              <dl class="artifact-details">
                <div><dt>Tamanho</dt><dd>${escapeHtml(formatBytes(current.download.size))}</dd></div>
                <div><dt>SHA-256 do ZIP</dt><dd><code>${escapeHtml(current.download.sha256)}</code></dd></div>
              </dl>
              <a class="release-details-link" href="${escapeHtml(current.releaseUrl)}" target="_blank" rel="noopener noreferrer">Ver notas e hashes da release</a>
            </aside>
          </div>
        </article>

        <div class="versions-section-heading">
          <p class="eyebrow"><span aria-hidden="true"></span>Evolução</p>
          <h2>Versões anteriores</h2>
          <p>Consulte o registro das versões anteriores e acompanhe a evolução dos recursos, correções e melhorias do BackupHub.</p>
        </div>
        <div class="version-history-grid">
${historicalCards}
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand brand-footer" href="../" aria-label="BackupHub — voltar ao início">
            <img src="../assets/icon-96.png" width="44" height="44" alt="">
            <span class="brand-name">Backup<span>Hub</span></span>
          </a>
          <p>Backups organizados, íntegros e auditáveis para Windows.</p>
        </div>
        <nav aria-label="Links do produto">
          <strong>Produto</strong>
          <a href="../#recursos">Recursos</a>
          <a href="../#interface">Interface</a>
          <a href="../#seguranca">Segurança</a>
          <a href="./" aria-current="page">Versões</a>
        </nav>
        <nav aria-label="Links do autor">
          <strong>Autor</strong>
          <a href="https://rodrigodil.github.io" rel="author noopener">Rodrigo Palombo Chisté</a>
          <a href="https://github.com/Rodrigodil" rel="noopener">Perfil no GitHub</a>
          <a href="https://www.linkedin.com/in/rodrigochiste/" rel="me noopener">LinkedIn</a>
        </nav>
      </div>
      <div class="container footer-bottom">
        <p>BackupHub — projeto independente.</p>
        <p>Histórico atualizado em <time datetime="${escapeHtml(manifest.updatedAt)}">${escapeHtml(formatDate(manifest.updatedAt))}</time>.</p>
      </div>
    </footer>
  </body>
</html>
`;

if (checkOnly) {
  const currentOutput = await readFile(outputPath, "utf8").catch(() => "");
  if (currentOutput !== html) {
    throw new Error("A página de versões está desatualizada. Execute npm run versions.");
  }
  console.log("Página de versões sincronizada com o manifesto.");
} else {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html, "utf8");
  console.log(`Página gerada: ${path.relative(root, outputPath)}`);
}
