# Instruções para manutenção do site BackupHub

Estas regras se aplicam a toda a pasta `Site-BackupHub`.

## Regra obrigatória de documentação

Toda alteração funcional, visual, textual, operacional ou de publicação exige
atualização da documentação correspondente na mesma entrega.

Antes de concluir qualquer mudança:

1. consulte o índice em `docs/README.md`;
2. identifique os documentos afetados pela matriz de
   `docs/manutencao-e-governanca.md`;
3. atualize os documentos canônicos e `docs/CHANGELOG.md`;
4. crie um ADR quando a decisão for estrutural, difícil de reverter ou alterar
   segurança, privacidade, publicação ou compatibilidade;
5. execute `npm run check`;
6. para mudanças visuais ou interativas, valide os breakpoints e os fluxos
   descritos em `docs/testes-e-qualidade.md`.

Uma alteração não está pronta quando código, conteúdo, ativos, workflow e
documentação descrevem estados diferentes.

## Invariantes públicas

- Somente `public/` pode ser publicado pelo GitHub Pages.
- `Logo-icone/` e `Screenshots/` são fontes locais e não podem entrar no
  repositório público.
- Capturas devem ser sanitizadas antes da publicação.
- Download e contribuição permanecem desabilitados até que URL, regras,
  segurança e conteúdo de suporte estejam validados.
- Não anunciar criptografia, restauração automática, confirmação de upload em
  nuvem ou outras capacidades inexistentes no aplicativo.
- Não chamar o produto de open source enquanto a licença não estiver definida.
- Não incluir credenciais, dados pessoais, caminhos internos, bancos, logs,
  tokens, cookies, analytics ou formulários sem decisão explícita e revisão de
  segurança e privacidade.

## Qualidade e compatibilidade

- Preservar HTML semântico, navegação por teclado, foco visível, contraste,
  `prefers-reduced-motion` e `forced-colors`.
- Tratar mobile, tablet e desktop como experiências adaptativas próprias.
- Não depender apenas de validação frontend para qualquer funcionalidade que
  futuramente envolva backend, download, pagamento ou coleta de dados.
- Links externos novos devem usar HTTPS e ser revisados antes da ativação.
- Mudanças de domínio, rota-base ou repositório exigem revisão coordenada de
  canonical, Open Graph, sitemap, robots, 404, servidor local e workflow.

