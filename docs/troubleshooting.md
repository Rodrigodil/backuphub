# Diagnóstico

## `npm run dev` informa porta ocupada

Use outra porta:

```powershell
$env:PORT=4174
npm run dev
```

Não encerre um processo preexistente sem identificar o proprietário e obter
autorização.

## A página abre sem estilos ou imagens

1. confirme que o servidor foi iniciado na raiz `Site-BackupHub`;
2. teste `/` e `/backuphub/`;
3. execute `npm run check`;
4. confira se os arquivos existem em `public/`;
5. evite abrir `index.html` diretamente por `file://`.

## A página 404 funciona localmente, mas não no Pages

- confirme que o workflow publicou `public/404.html`;
- confira referências com a rota-base `/backuphub/`;
- valide a configuração **Settings > Pages > GitHub Actions**.

## `npm run assets` falha

- confirme `npm install`;
- confirme que `Logo-icone/` e `Screenshots/` existem localmente;
- confirme os nomes das quatro capturas;
- valide compatibilidade do Node com `sharp`;
- não substitua os originais para contornar a falha.

## Captura pública ainda contém dado interno

1. interrompa a publicação;
2. ajuste máscaras em `tools/process-assets.mjs`;
3. execute `npm run assets`;
4. revise PNG, WebP e AVIF;
5. se já publicada, remova imediatamente e faça novo deploy;
6. trate exposição de credencial como incidente.

## `npm run check` falha em documentação

- abra o caminho informado;
- corrija o link relativo ou crie o documento obrigatório;
- não desabilite a validação para publicar;
- atualize o índice se um documento for movido.

## Site publicado desatualizado

- confirme o commit do workflow;
- verifique se o push ocorreu em `main`;
- abra a execução do GitHub Pages;
- confirme que o artefato veio de `public/`;
- faça rollback por commit se a versão atual estiver incorreta.

