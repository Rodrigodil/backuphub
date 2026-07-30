# Manutenção e governança

## Regra central

Toda alteração do site exige atualização da documentação correspondente e de
`docs/CHANGELOG.md` na mesma entrega. Isso inclui mudanças de texto, estilos,
breakpoints, scripts, imagens, SEO, dependências, ferramentas, segurança e
publicação.

## Matriz de impacto documental

| Mudança | Documentos mínimos |
|---|---|
| texto ou capacidade anunciada | visão geral, conteúdo, SEO e changelog |
| seção, CTA ou âncora | conteúdo, contratos da interface, testes e changelog |
| breakpoint ou layout | UI/acessibilidade, testes e changelog |
| comportamento JavaScript | arquitetura, contratos, testes e changelog |
| ativo ou captura | ativos, segurança, testes e changelog |
| domínio ou rota-base | SEO, publicação, desenvolvimento, 404 e changelog |
| dependência npm | arquitetura, segurança, desenvolvimento e changelog |
| workflow ou permissões | publicação, segurança, ADR quando estrutural e changelog |
| coleta de dados ou terceiro | segurança, privacidade, arquitetura, novo ADR e changelog |
| download | runbook de download, conteúdo, segurança, SEO e changelog |
| contribuição financeira | runbook de contribuição, segurança, privacidade e changelog |
| decisão estrutural | novo ADR, arquitetura e changelog |

## Processo de mudança

1. identificar comportamento, risco e público afetados;
2. mapear segurança, privacidade, acessibilidade e compatibilidade;
3. implementar a menor mudança coerente;
4. atualizar documentos da matriz;
5. registrar a mudança no changelog;
6. executar `npm run check` e `npm audit`;
7. realizar QA proporcional;
8. definir rollback;
9. revisar arquivos que serão publicados.

## ADR

Crie um ADR quando houver mudança difícil de reverter em arquitetura,
hospedagem, segurança, privacidade, ativos, dependências, rotas, domínio ou
integrações. ADR aceito não deve ser reescrito para apagar a decisão; marque-o
como substituído e crie outro.

## Versionamento

O `package.json` usa a versão documental do site. Alterações públicas relevantes
devem atualizar o changelog. A versão do site não substitui a versão do
aplicativo nem deve ativar release automaticamente.

## Revisão periódica

Mensalmente ou antes de cada release:

- revisar links externos;
- executar auditoria de dependências;
- revisar permissões do workflow;
- confirmar canonical e sitemap;
- revisar ativos por dados internos;
- testar breakpoints e teclado;
- confirmar estados de download e contribuição;
- verificar se a documentação corresponde ao site.

