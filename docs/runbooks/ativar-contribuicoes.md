# Runbook: ativar contribuições financeiras

## Estado inicial

A seção existe, mas o botão está desabilitado e nenhuma plataforma foi
escolhida.

## Pré-condições

- plataforma e conta aprovadas pelo mantenedor;
- URL HTTPS oficial;
- identidade do recebedor revisada;
- taxas, moeda, recorrência e política de reembolso compreendidas;
- impactos fiscais e de privacidade avaliados;
- política sobre uso dos recursos redigida;
- decisão sobre link externo ou conteúdo incorporado;
- revisão de rastreamento e cookies de terceiros.

## Implementação recomendada

Preferir link externo explícito, sem script ou iframe de terceiros. Isso mantém
o site sem cookies e reduz superfície de segurança.

1. converter o botão desabilitado em link;
2. identificar a plataforma antes da navegação;
3. informar que a transação ocorre fora do site;
4. usar `rel="noopener noreferrer"` quando aplicável;
5. atualizar segurança, privacidade, conteúdo, contratos, testes e changelog;
6. revisar a política da plataforma periodicamente.

## PIX

Se PIX for escolhido, não publicar chave, QR Code ou dado pessoal antes de
revisar exposição, titularidade e risco de reutilização indevida. Não coletar
comprovantes pelo site estático.

## Rollback

Remover o link e restaurar o botão “Em breve”. Se houver comprometimento da
conta, interromper a divulgação e seguir o procedimento da plataforma.

