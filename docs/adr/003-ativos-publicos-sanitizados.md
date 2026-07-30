# ADR 003 — Fontes locais e derivados públicos sanitizados

## Estado

Aceito em 30/07/2026.

## Contexto

As capturas originais do aplicativo contêm caminhos, nomes de projetos e
identificadores operacionais. O site precisa mostrar a interface sem expor
contexto interno.

## Decisão

Manter `Logo-icone/` e `Screenshots/` locais e ignorados pelo Git. Gerar
derivados sanitizados em `public/assets/` por meio de
`tools/process-assets.mjs`, usando PNG, WebP e AVIF.

## Consequências

### Positivas

- separação explícita entre fonte e artefato publicável;
- formatos otimizados;
- processo repetível;
- menor risco de exposição acidental.

### Negativas

- coordenadas de máscara dependem das dimensões da captura;
- revisão visual continua obrigatória;
- recriar os ativos exige as fontes locais.

## Alternativas

- publicar originais: rejeitado por segurança;
- usar somente recortes: insuficiente para todas as telas;
- recriar interfaces ilustrativas: rejeitado por reduzir fidelidade.

## Rollback

Remover o derivado comprometido de `public/`, corrigir máscaras, regenerar e
publicar novamente. Se houver credencial ou dado sensível, tratar como
incidente além do rollback visual.

