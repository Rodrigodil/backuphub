# UI, responsividade e acessibilidade

## Diretriz

O site é Mobile First e adaptativo. Os breakpoints não servem apenas para
reduzir dimensões: eles alteram navegação, composição, densidade e forma de
explorar a galeria.

## Breakpoints canônicos

| Faixa | Comportamento principal |
|---|---|
| abaixo de 560 px | coluna única, CTAs empilhados e seletores da vitrine por gesto horizontal |
| 560 px ou mais | recursos em duas colunas e fatos do hero em três colunas |
| 768 px ou mais | composições em duas colunas e seletores da vitrine em grade |
| 960 px ou mais | navegação desktop, hero dividido e recursos em três colunas |
| 1200 px ou mais | aproveitamento ampliado do hero e elementos flutuantes |

Os pontos de validação obrigatórios são 390, 768 e 1440 px.

## Navegação

### Mobile e tablet

- botão de menu com área mínima de 48 x 48 px;
- `aria-expanded` e rótulo alternando entre abrir e fechar;
- bloqueio do scroll de fundo enquanto aberto;
- fechamento ao selecionar link, pressionar `Esc` ou entrar no breakpoint
  desktop.

### Desktop

- links visíveis no cabeçalho;
- botão de menu oculto;
- CTA de download presente, porém desabilitado.

## Vitrine do aplicativo

- há um único visualizador principal, evitando a repetição de capturas grandes;
- mobile: seletores compactos em rolagem horizontal com `scroll-snap`;
- tablet: seletores em grade de duas colunas abaixo do visualizador;
- desktop: visualizador e trilho vertical de seletores lado a lado;
- o seletor ativo usa `aria-pressed` e atualiza imagem, título e descrição;
- a imagem em destaque é aberta por botão com nome acessível;
- o `dialog` move foco para fechar, aceita `Esc`, fecha no backdrop e devolve
  foco ao botão original.

## Acessibilidade

- idioma `pt-BR`;
- link para pular ao conteúdo;
- regiões nomeadas por títulos;
- hierarquia de headings;
- textos alternativos em todas as imagens;
- botões realmente desabilitados, não links vazios;
- foco visível;
- contraste projetado para WCAG AA;
- suporte a `prefers-reduced-motion`;
- suporte a `forced-colors`;
- conteúdo principal permanece legível sem JavaScript.

## Cuidados em alterações

- não remover nomes acessíveis dos controles;
- não esconder foco;
- não introduzir interação apenas por hover;
- garantir alvos de toque de ao menos 44 x 44 px;
- testar zoom e textos longos;
- evitar rolagem horizontal da página;
- atualizar este documento se um breakpoint ou comportamento mudar.
