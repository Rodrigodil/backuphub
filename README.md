# BackupHub

O BackupHub é um projeto independente para organização e execução de backups
no Windows. O aplicativo reúne arquivos e bancos de dados em uma interface
única, com foco em configuração clara, integridade e histórico das execuções.

## Principais recursos

- backup de arquivos;
- suporte a MariaDB, MySQL, PostgreSQL e Firebird;
- perfis independentes para diferentes rotinas;
- exclusões guiadas por origem, pasta e arquivo;
- agendamentos com aviso prévio e novas tentativas;
- retenção configurável;
- verificação de integridade com SHA-256;
- histórico auditável das execuções.

## Compatibilidade

O aplicativo é portátil e self-contained, preparado para Windows 11 x64. Não
exige instalação de runtime separado para sua execução.

## Download

As versões estáveis são distribuídas pela página oficial de
[GitHub Releases](https://github.com/Rodrigodil/backuphub/releases/latest).
Cada release informa versão, tamanho, SHA-256, instruções de atualização,
limitações e rollback.

## Histórico de versões

A página pública [Versões](https://rodrigodil.github.io/backuphub/versoes/)
lista todas as releases estáveis. Somente a versão mais recente oferece download
direto; versões anteriores permanecem como histórico sem link para seus pacotes.

O arquivo `versions.json` é a fonte canônica da página. Depois de alterá-lo,
execute `npm run versions` para regenerar `public/versoes/index.html`. O comando
`npm run check` rejeita divergência entre manifesto, `package.json`, página,
download atual e sitemap.

Quando o mantenedor solicitar **“atualizar tudo”**, a entrega inclui
obrigatoriamente a página única de versões. A nova release deve existir e estar
validada antes de atualizar o download direto no site. A mesma entrega também
deve atualizar os dois CTAs de download da página principal e seu dado
estruturado `downloadUrl`, sempre usando a URL do ZIP vigente em `versions.json`.

O projeto não promete criptografia dos backups, restauração automática,
sincronização ou confirmação de upload em serviços de nuvem.

## Site oficial

Conheça o projeto e acompanhe sua disponibilidade em:

**[rodrigodil.github.io/backuphub](https://rodrigodil.github.io/backuphub/)**

## Contribuições

O apoio financeiro está disponível pelo
[Payment Link da Stripe](https://donate.stripe.com/28E5kD8OH7fV6dW7I6cEw00).
O pagamento ocorre fora do site e o BackupHub não recebe dados do cartão.

A integração atual usa uma conta temporária. URL e QR Code serão substituídos
de forma coordenada quando a conta definitiva do projeto estiver disponível;
confira sempre o canal vigente no site oficial.

## Licença

A licença e as condições para contribuições técnicas ainda serão definidas.
