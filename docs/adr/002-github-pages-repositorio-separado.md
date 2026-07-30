# ADR 002 — GitHub Pages em repositório separado

## Estado

Aceito em 30/07/2026.

## Contexto

O aplicativo ainda não possui licença aberta definida e seu repositório não
deve ser exposto apenas para hospedar a landing page. O site precisa ser
público, estático e independente.

## Decisão

Publicar o site no repositório público `Rodrigodil/backuphub`, usando GitHub
Actions e a URL `https://rodrigodil.github.io/backuphub/`. Somente `public/`
entra no artefato do Pages.

## Consequências

### Positivas

- separação entre código do aplicativo e comunicação pública;
- permissões e histórico próprios;
- publicação compatível com hospedagem estática;
- rollback por commit ou workflow.

### Negativas

- mudanças coordenadas exigem atualização em dois repositórios;
- rota-base `/backuphub/` precisa ser considerada;
- domínio e disponibilidade dependem do GitHub.

## Alternativas

- publicar no repositório do aplicativo: descartado por acoplamento e
  visibilidade;
- usar o site pessoal existente: descartado por misturar ciclos de publicação;
- servidor próprio: adiado por custo operacional desnecessário nesta fase.

## Rollback

Desabilitar Pages ou reverter ao último commit estável. Uma mudança de provedor
exige novo ADR e atualização de URLs canônicas.

