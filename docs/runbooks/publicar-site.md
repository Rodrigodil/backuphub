# Runbook: publicar o site

## Pré-condições

- repositório público `Rodrigodil/backuphub`;
- branch `main`;
- GitHub Pages configurado para GitHub Actions;
- árvore revisada;
- nenhuma fonte local versionada;
- documentação e changelog atualizados.

## Procedimento

1. executar:

   ```powershell
   npm ci
   npm run check
   npm audit
   ```

2. executar `npm run dev` e validar a mudança;
3. revisar `git status --ignored`;
4. revisar o diff;
5. confirmar que somente conteúdo autorizado entra no commit;
6. enviar `main`;
7. acompanhar o workflow;
8. validar a URL publicada conforme
   [Publicação no GitHub Pages](../publicacao-github-pages.md).

## Falha

- não repita o deploy sem identificar a causa;
- se a falha for de validação, corrija a fonte;
- se a versão publicada estiver quebrada, reverta por novo commit;
- se houver exposição de dado, remova, avalie impacto e rotacione qualquer
  segredo potencialmente comprometido.

## Evidência mínima

- commit publicado;
- execução do workflow;
- URL final;
- resultado de `npm run check`;
- resultado de QA;
- rollback conhecido.

