# Contratos da interface

## Âncoras públicas

| ID | Seção |
|---|---|
| `inicio` | hero |
| `recursos` | recursos |
| `interface` | galeria |
| `seguranca` | transparência |
| `apoie` | contribuições |
| `conteudo` | destino do skip link |

Alterar um ID exige atualizar cabeçalho, rodapé, testes e documentação.

## Contrato do menu

- botão: `[data-menu-toggle]`;
- navegação: `[data-menu]`;
- estado aberto: classe `.is-open`;
- bloqueio do corpo: `.menu-open`;
- breakpoint compartilhado entre CSS e JavaScript: 960 px;
- atributos: `aria-controls`, `aria-expanded` e `aria-label`.

O valor de 960 px deve permanecer sincronizado entre `styles.css` e
`script.js`.

## Contrato da galeria

| Elemento | Marcador |
|---|---|
| vitrine | `[data-showcase]` |
| selecionar captura | `[data-showcase-select]` |
| imagem PNG | `data-png` |
| derivado WebP | `data-webp` |
| derivado AVIF | `data-avif` |
| título e descrição | `data-title` e `data-description` |
| visualizador principal | `[data-showcase-preview]` |
| abrir imagem | `[data-gallery-open]` |
| URL ampliada | `data-image` |
| descrição ampliada | `data-alt` |
| dialog | `[data-lightbox]` |
| imagem | `[data-lightbox-image]` |
| legenda | `[data-lightbox-caption]` |
| fechar | `[data-lightbox-close]` |

Os seletores devem ser botões com estado `aria-pressed`. O disparador da
ampliação deve ser um botão, possuir nome acessível e recuperar foco após o
fechamento.

## CTAs pendentes

Existem três representações do download:

1. cabeçalho;
2. hero;
3. texto de disponibilidade.

Há um CTA de contribuições na seção `apoie`.

Enquanto pendentes:

- usar `<button disabled>`;
- não usar `href`;
- exibir “Em breve”;
- não disparar eventos;
- não coletar dados.

## Rotas e arquivos

- `/` e `/backuphub/`: página principal no servidor local;
- `/backuphub/` no GitHub Pages;
- `/backuphub/404.html`: arquivo de erro publicado;
- referências da página principal são relativas;
- referências da 404 usam a rota-base absoluta `/backuphub/`.

## Eventos

Não existem eventos de analytics ou integração. Eventos JavaScript são
exclusivamente locais:

- click do menu;
- click de âncora do menu;
- mudança do media query;
- seleção da captura em destaque;
- click de abertura e fechamento do dialog;
- click no backdrop;
- evento `close`;
- tecla `Escape`.
