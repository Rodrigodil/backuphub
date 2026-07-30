# SEO e metadados

## URL canônica

URL atual planejada:

`https://rodrigodil.github.io/backuphub/`

Ela aparece em:

- `link[rel="canonical"]`;
- `og:url`;
- `og:image`;
- JSON-LD;
- `robots.txt`;
- `sitemap.xml`;
- página 404 e documentação de publicação.

Uma mudança de domínio ou nome do repositório deve atualizar todos esses pontos
na mesma entrega.

## Metadados

- título com produto, benefício e plataforma;
- descrição curta com arquivos, quatro bancos e SHA-256;
- `theme-color`;
- política de referência;
- Open Graph em `pt_BR`;
- Twitter/X com `summary_large_image`;
- imagem social 1200 x 630;
- ícones para navegador e Apple Touch.

## Dados estruturados

O JSON-LD usa `SoftwareApplication` com:

- nome;
- categoria de utilitário;
- sistema operacional;
- URL;
- descrição;
- autor.

Não há `downloadUrl`, preço, nota, licença ou versão publicada enquanto esses
dados não forem oficiais.

## Indexação

- `robots.txt` permite indexação e aponta para o sitemap;
- `sitemap.xml` contém somente a página principal;
- `404.html` usa `noindex`;
- não existem páginas duplicadas ou parâmetros canônicos.

## Checklist de alteração

1. manter título e descrição coerentes com a página;
2. validar URL absoluta e HTTPS;
3. conferir imagem e texto social;
4. atualizar `lastmod` do sitemap quando houver mudança pública relevante;
5. validar JSON-LD;
6. revisar links após publicação;
7. atualizar documentação e changelog.

