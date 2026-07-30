# Publicação no GitHub Pages

## Destino

- repositório público planejado: `Rodrigodil/backuphub`;
- branch: `main`;
- URL: `https://rodrigodil.github.io/backuphub/`;
- origem do Pages: GitHub Actions.

O site deve permanecer separado do repositório privado do aplicativo.

## Workflow

`.github/workflows/pages.yml`:

1. obtém o repositório;
2. instala Node e dependências bloqueadas pelo `package-lock.json`;
3. executa validações;
4. procura conteúdo interno proibido;
5. configura GitHub Pages;
6. empacota somente `public/`;
7. publica com OIDC.

O workflow também aceita execução manual por `workflow_dispatch`.

## Configuração inicial

1. criar o repositório público vazio `Rodrigodil/backuphub`;
2. usar `Site-BackupHub` como raiz desse repositório;
3. revisar `git status --ignored`;
4. confirmar que `Logo-icone/`, `Screenshots/` e `node_modules/` não serão
   versionados;
5. enviar o branch `main`;
6. em **Settings > Pages**, selecionar **GitHub Actions**;
7. acompanhar a execução;
8. validar a URL publicada.

## Validação pós-publicação

- página inicial e 404;
- assets PNG, WebP e AVIF;
- navegação por âncoras;
- menu e lightbox;
- canonical, Open Graph, robots e sitemap;
- ausência de links quebrados;
- ausência de dados internos;
- console sem erros;
- CTAs ainda desabilitados, quando aplicável.

## Rollback

O rollback preferencial é:

1. identificar o último commit publicado e validado;
2. reverter a mudança defeituosa com novo commit;
3. executar o workflow;
4. validar novamente o site;
5. registrar causa, impacto e correção no changelog.

Não reescreva o histórico público para esconder a falha. Se o conteúdo exposto
for sensível, remova-o imediatamente, invalide credenciais se necessário e
trate o histórico conforme o plano de incidente.

## Domínio próprio

Adicionar domínio próprio exige atualização coordenada de DNS, canonical,
Open Graph, JSON-LD, robots, sitemap, 404, documentação e estratégia contra
sequestro de domínio.

