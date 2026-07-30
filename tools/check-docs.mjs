import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredDocuments = [
  "AGENTS.md",
  "README.md",
  "docs/README.md",
  "docs/visao-geral.md",
  "docs/arquitetura.md",
  "docs/conteudo-e-posicionamento.md",
  "docs/ui-responsividade-acessibilidade.md",
  "docs/ativos-e-identidade-visual.md",
  "docs/seo-e-metadados.md",
  "docs/seguranca-e-privacidade.md",
  "docs/desenvolvimento-local.md",
  "docs/testes-e-qualidade.md",
  "docs/publicacao-github-pages.md",
  "docs/manutencao-e-governanca.md",
  "docs/troubleshooting.md",
  "docs/CHANGELOG.md",
  "docs/referencias/estrutura-projeto.md",
  "docs/referencias/contratos-interface.md",
  "docs/runbooks/publicar-site.md",
  "docs/runbooks/ativar-download.md",
  "docs/runbooks/ativar-contribuicoes.md",
  "docs/adr/README.md"
];
const forbiddenPublicTerms = [
  "Projetos-Workspace",
  "Sistemas-KS",
  "Meu Drive",
  "mariadb-local-ks",
  "MariaDB local KS",
  "Aplicativo-Backup",
  "RodrigoTI",
  "C:\\Users"
];

for (const document of requiredDocuments) {
  await access(path.join(root, document));
}

async function findMarkdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory)) {
    const absolute = path.join(directory, entry);
    const metadata = await stat(absolute);
    if (metadata.isDirectory()) {
      files.push(...(await findMarkdownFiles(absolute)));
    } else if (path.extname(entry).toLowerCase() === ".md") {
      files.push(absolute);
    }
  }
  return files;
}

const markdownFiles = [
  path.join(root, "AGENTS.md"),
  path.join(root, "README.md"),
  ...(await findMarkdownFiles(path.join(root, "docs")))
];
const errors = [];

for (const file of markdownFiles) {
  const content = await readFile(file, "utf8");
  for (const term of forbiddenPublicTerms) {
    if (content.includes(term)) {
      errors.push(
        `${path.relative(root, file)} contém termo interno proibido: ${term}`
      );
    }
  }

  const links = [...content.matchAll(/\[[^\]]+]\(([^)]+)\)/g)]
    .map((match) => match[1].trim())
    .filter(Boolean);

  for (const link of links) {
    if (
      link.startsWith("#")
      || link.startsWith("/")
      || /^[a-z][a-z0-9+.-]*:/i.test(link)
    ) {
      continue;
    }

    const targetWithoutAnchor = link.split("#", 1)[0];
    const target = path.resolve(path.dirname(file), decodeURIComponent(targetWithoutAnchor));

    try {
      await access(target);
    } catch {
      errors.push(
        `${path.relative(root, file)} aponta para arquivo inexistente: ${link}`
      );
    }
  }
}

const readme = await readFile(path.join(root, "README.md"), "utf8");
if (!readme.includes("docs/README.md")) {
  errors.push("README.md não aponta para o índice canônico docs/README.md.");
}

if (errors.length > 0) {
  throw new Error(`Falhas na documentação:\n- ${errors.join("\n- ")}`);
}

console.log(
  `Documentação validada: ${markdownFiles.length} arquivos Markdown e links relativos íntegros.`
);
