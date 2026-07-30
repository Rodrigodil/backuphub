# Estrutura do projeto

## Raiz

| Caminho | Responsabilidade |
|---|---|
| `AGENTS.md` | regras obrigatórias de manutenção |
| `README.md` | início rápido e publicação |
| `package.json` | comandos e dependências de desenvolvimento |
| `package-lock.json` | resolução reproduzível das dependências |
| `.gitignore` | exclusão de fontes locais e estado de desenvolvimento |

## Conteúdo público

| Caminho | Responsabilidade |
|---|---|
| `public/index.html` | página principal, conteúdo e metadados |
| `public/styles.css` | identidade e layouts adaptativos |
| `public/script.js` | menu e lightbox |
| `public/404.html` | fallback de rota |
| `public/robots.txt` | política de indexação |
| `public/sitemap.xml` | mapa público |
| `public/assets/` | ícones, Open Graph e capturas sanitizadas |

Somente essa pasta pode entrar no artefato do GitHub Pages.

## Ferramentas

| Caminho | Responsabilidade |
|---|---|
| `tools/dev-server.mjs` | servidor local |
| `tools/process-assets.mjs` | geração dos derivados públicos |
| `tools/check-site.mjs` | integridade do site |
| `tools/check-docs.mjs` | integridade documental |

## Documentação

| Caminho | Responsabilidade |
|---|---|
| `docs/README.md` | índice canônico |
| `docs/CHANGELOG.md` | estado e evolução |
| `docs/adr/` | decisões arquiteturais |
| `docs/runbooks/` | procedimentos operacionais |
| `docs/referencias/` | contratos e estrutura |

## Automação

`.github/workflows/pages.yml` valida e publica a pasta `public/`.

## Fontes locais ignoradas

| Caminho | Motivo |
|---|---|
| `Logo-icone/` | arquivos de marca em alta resolução |
| `Screenshots/` | capturas originais com possíveis dados internos |
| `node_modules/` | dependências restauráveis pelo lockfile |

Esses caminhos não podem ser adicionados por exceção ao repositório público sem
revisão de segurança e decisão documentada.

