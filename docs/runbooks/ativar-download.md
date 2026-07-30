# Runbook: ativar o download

## Estado inicial

O download está desabilitado e não possui URL.

## Pré-condições

- release pública autorizada;
- licença e condições de distribuição definidas;
- artefato gerado a partir de árvore limpa;
- smoke test concluído;
- versão, sistema operacional e dependências documentados;
- SHA-256 publicado;
- pacote sem SQLite, logs, credenciais ou configurações locais;
- atualização e rollback descritos;
- URL HTTPS oficial e estável.

## Implementação

1. substituir os botões desabilitados por links HTTPS;
2. manter rótulo claro com versão e formato;
3. incluir tamanho e SHA-256 próximos ao download;
4. não usar download automático;
5. atualizar JSON-LD apenas com dados publicados;
6. atualizar conteúdo, SEO, segurança, contratos, testes e changelog;
7. validar navegação por teclado e dispositivos;
8. criar ADR se o modelo de distribuição introduzir nova infraestrutura.

## Segurança

- preferir GitHub Releases ou origem controlada;
- nunca apontar para arquivo mutável sem versão;
- validar redirecionamentos;
- não confiar apenas no hash exibido pelo próprio arquivo ou mesma origem
  comprometida;
- revisar alertas de navegador e reputação do artefato.

## Rollback

Desabilitar novamente os CTAs, remover a URL pública e registrar o motivo. Uma
release comprometida deve ser retirada e acompanhada de comunicação explícita.

