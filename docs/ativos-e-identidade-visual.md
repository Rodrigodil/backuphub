# Ativos e identidade visual

## Paleta

As variáveis canônicas ficam em `public/styles.css`.

| Papel | Referência |
|---|---|
| fundo principal | `--navy-900` e `--navy-950` |
| ação e destaque | `--blue-700`, `--blue-600` e `--blue-500` |
| integridade | `--green-600` e `--green-500` |
| texto | `--ink-900`, `--ink-700` e `--ink-600` |
| superfícies | branco, `--surface-soft` e `--surface-blue` |

O verde representa validação e integridade. Ele não deve sugerir garantia
absoluta de segurança.

## Tipografia

A pilha prioriza `Segoe UI Variable` e `Segoe UI`, com fallbacks de sistema. Não
há fonte externa, evitando requisições adicionais e rastreamento por terceiros.

## Marca

- o ícone oficial é a fonte para favicons e marca da página;
- o nome `BackupHub` é renderizado como texto para manter nitidez e
  acessibilidade;
- a mensagem “Seus dados, sempre seguros” não é usada por ser absoluta.

## Fontes locais

| Pasta | Conteúdo | Publicação |
|---|---|---|
| `Logo-icone/` | PNG e ICO originais | proibida |
| `Screenshots/` | capturas originais | proibida |

Essas pastas são ignoradas pelo Git e podem conter dados que não devem ser
expostos.

## Derivados públicos

`npm run assets` executa `tools/process-assets.mjs` e produz:

- ícones PNG em 32, 96, 180 e 512 px;
- favicon PNG de 32 px;
- cópia do ICO;
- capturas sanitizadas em PNG, WebP e AVIF.

Dimensões atuais:

| Ativo | Dimensão |
|---|---|
| Open Graph | 1200 x 630 |
| visão geral | 1383 x 979 |
| perfis | 1102 x 711 |
| bancos | 1101 x 710 |
| agendamentos | 1105 x 709 |

## Sanitização

As máscaras substituem perfil, origem, destino, nomes de conexões e
identificadores locais por rótulos neutros. Alterações nas capturas exigem:

1. revisão visual de cada fonte;
2. atualização das coordenadas de máscara;
3. execução de `npm run assets`;
4. inspeção das saídas PNG, WebP e AVIF;
5. busca por dados internos;
6. atualização deste documento e do changelog.

Nunca confie somente na ausência de termos em arquivos de texto: capturas
precisam de inspeção visual.

## Open Graph

`public/assets/og-backuphub.png` usa a marca oficial, fundo azul-marinho e os
textos “BackupHub” e “Backups organizados, íntegros e auditáveis.” Qualquer nova
imagem deve ser inspecionada contra texto inventado, erros de acentuação e
alegações incompatíveis com o produto.

