# ADR 001 — Site estático sem framework

## Estado

Aceito em 30/07/2026.

## Contexto

O produto precisa de uma landing page única, rápida, simples, acessível e
publicável no GitHub Pages. Não há autenticação, backend, formulário,
persistência ou conteúdo dinâmico.

## Decisão

Usar HTML, CSS e JavaScript nativos. Dependências npm ficam restritas a
ferramentas de desenvolvimento e não entram no navegador.

## Consequências

### Positivas

- superfície de ataque e cadeia de dependências menores;
- artefato final legível e auditável;
- publicação sem build;
- carregamento rápido;
- baixa complexidade operacional.

### Negativas

- componentes não possuem abstração de framework;
- conteúdo repetido exige cuidado manual;
- expansão para muitas páginas pode demandar gerador estático futuro.

## Alternativas

- React/Vite: descartado por não haver estado ou composição que justifique;
- Astro: descartado para a primeira versão por adicionar ferramenta de build;
- CMS: descartado por ampliar operação, autenticação e segurança.

## Rollback

Uma migração futura deve preservar URLs, conteúdo, acessibilidade, ativos e
metadados. Exige novo ADR e comparação de desempenho e manutenção.

