# Segurança e privacidade

## Superfície atual

O site é estático e não possui backend, formulário, autenticação, cookies,
analytics, armazenamento no navegador ou integração de pagamento.

## Dados públicos

São públicos apenas:

- HTML, CSS e JavaScript da landing page;
- ícones derivados;
- imagem Open Graph;
- capturas sanitizadas;
- robots, sitemap e 404.

Fontes originais, caminhos internos e dados operacionais não podem entrar no
repositório nem no artefato publicado.

## Servidor local

`npm run dev`:

- escuta em `127.0.0.1`;
- aceita somente `GET` e `HEAD`;
- limita caminhos a `public/`;
- responde 405 para outros métodos;
- aplica `X-Content-Type-Options: nosniff`;
- aplica `Referrer-Policy` aos arquivos;
- desabilita cache para desenvolvimento;
- valida a porta informada;
- encerra de forma controlada em `SIGINT` e `SIGTERM`.

Ele é ferramenta de desenvolvimento, não servidor de produção.

## Publicação

O workflow usa permissões mínimas:

- `contents: read`;
- `pages: write`;
- `id-token: write`.

O artefato contém somente `public/`. Nenhum token é persistido no projeto.

## Dependências

As dependências são de desenvolvimento e devem ser revisadas com:

```powershell
npm audit
```

Atualizações precisam preservar compatibilidade com a versão do Node e passar
por `npm run check`.

## Riscos residuais

- informação sensível pode existir dentro de pixels mesmo sem termo textual;
- link futuro de download pode apontar para artefato comprometido;
- plataforma de contribuição pode introduzir rastreamento ou terceiros;
- dependências de Actions e npm podem sofrer comprometimento de cadeia;
- GitHub Pages define cabeçalhos HTTP de produção fora do repositório;
- links externos podem mudar de destino.

## Mudanças que exigem nova revisão

- download ativo;
- pagamento ou doação;
- formulário;
- analytics;
- cookies;
- domínio próprio;
- scripts de terceiros;
- backend ou API;
- cabeçalhos via novo provedor;
- autenticação ou armazenamento local.

Essas mudanças exigem ADR, modelo de ameaça proporcional, política de
privacidade e rollback.

