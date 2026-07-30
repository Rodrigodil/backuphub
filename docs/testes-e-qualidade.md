# Testes e qualidade

## Validação automatizada

`npm run check` executa:

1. `html-validate` sobre `public/index.html` e `public/404.html`;
2. `tools/check-site.mjs`;
3. `tools/check-docs.mjs`.

## Contratos de `check-site`

- arquivos públicos obrigatórios existem;
- termos internos proibidos não aparecem em conteúdo textual público;
- referências relativas da página principal resolvem em `public/`;
- CTAs continuam com estado desabilitado enquanto a funcionalidade não existe.

## Contratos de `check-docs`

- documentos canônicos existem;
- links Markdown relativos apontam para arquivos existentes;
- README principal aponta para a documentação;
- changelog e governança estão presentes.

Esses testes reduzem inconsistência, mas não substituem revisão visual,
semântica ou de segurança.

## Matriz de QA visual

| Viewport | Navegação | Layout | Galeria |
|---|---|---|---|
| 390 px | menu compacto | coluna única | visualizador e seletores por toque |
| 768 px | menu compacto | composições em duas colunas | seletores em grade 2 x 2 |
| 1440 px | menu inline | hero dividido e recursos em três colunas | visualizador com trilho lateral |

Em todos os tamanhos:

- sem overflow horizontal da página;
- textos legíveis sem corte;
- alvos de toque adequados;
- CTAs desabilitados;
- imagens carregadas;
- foco visível.

## Fluxos interativos

### Menu

1. abrir;
2. confirmar `aria-expanded="true"`;
3. confirmar bloqueio de scroll;
4. fechar por botão;
5. fechar por link;
6. fechar por `Esc`;
7. redimensionar para desktop e confirmar reset.

### Lightbox

1. selecionar cada captura e confirmar `aria-pressed`;
2. confirmar atualização da imagem, do título e da descrição;
3. abrir a captura em destaque;
4. confirmar imagem e texto alternativo;
5. confirmar foco no botão fechar;
6. fechar por botão, backdrop e `Esc`;
7. confirmar retorno do foco ao disparador.

### Sem JavaScript

- conteúdo e âncoras permanecem acessíveis;
- somente menu compacto e ampliação ficam indisponíveis;
- mensagem de fallback aparece.

## Testes HTTP locais

Com `npm run dev`:

- `/` retorna 200;
- `/backuphub/` retorna 200;
- arquivos estáticos retornam MIME correto;
- caminho inexistente retorna 404 com a página customizada;
- `HEAD` retorna headers sem corpo;
- métodos diferentes de `GET` e `HEAD` retornam 405.

## Antes da publicação

- `npm run check`;
- `npm audit`;
- revisão visual dos ativos;
- busca de segredos e dados internos;
- revisão de links externos;
- validação dos metadados sociais;
- conferência da documentação e changelog.
