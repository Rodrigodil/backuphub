# Site do BackupHub

Landing page estática do BackupHub, preparada para publicação independente em
`https://rodrigodil.github.io/backuphub/`.

## Estrutura

- `public/`: conteúdo que será publicado pelo GitHub Pages;
- `.github/workflows/pages.yml`: publicação automatizada;
- `Logo-icone/` e `Screenshots/`: fontes locais ignoradas pelo Git.

O site não utiliza framework, backend, cookies, analytics ou dependências em
produção.

## Documentação

A documentação técnica canônica está em [docs/README.md](docs/README.md).
Toda alteração do site deve atualizar os documentos afetados e
[docs/CHANGELOG.md](docs/CHANGELOG.md) na mesma entrega.

## Executar localmente

Instale as dependências de desenvolvimento apenas na primeira execução:

```powershell
npm install
```

Inicie o site:

```powershell
npm run dev
```

Abra `http://localhost:4173`. O endereço
`http://localhost:4173/backuphub/` também está disponível para simular o caminho
final do GitHub Pages.

Para usar outra porta:

```powershell
$env:PORT=4174
npm run dev
```

## Publicação

1. crie o repositório público `Rodrigodil/backuphub`;
2. use esta pasta como raiz do novo repositório;
3. em **Settings > Pages**, escolha **GitHub Actions** como origem;
4. envie o branch `main`.

O workflow publica exclusivamente `public/`. As capturas originais e os demais
arquivos-fonte não entram no artefato do site.

## Ativação futura dos botões

Download e contribuição permanecem desabilitados no HTML. Antes de ativá-los:

- publique uma release reproduzível acompanhada do SHA-256;
- valide versão, requisitos, limitações e rollback;
- escolha e valide uma plataforma de contribuição;
- use exclusivamente URLs HTTPS oficiais.
