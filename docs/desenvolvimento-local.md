# Desenvolvimento local

## Pré-requisitos

- Node.js 24.8 ou superior;
- npm compatível;
- Windows PowerShell para os exemplos deste projeto.

O requisito de Node acompanha o `html-validate` usado na linha atual.

## Instalação

```powershell
cd backuphub
npm install
```

## Executar

```powershell
npm run dev
```

Endereços:

- `http://localhost:4173`;
- `http://localhost:4173/backuphub/`, que simula a rota-base do GitHub Pages.

Para alterar a porta:

```powershell
$env:PORT=4174
npm run dev
```

O host permanece `127.0.0.1` por segurança. Não use esse servidor como serviço
de produção.

## Comandos

| Comando | Uso |
|---|---|
| `npm run dev` | servir o site localmente |
| `npm run assets` | recriar ícones e capturas públicas |
| `npm run check` | validar HTML, site e documentação |
| `npm audit` | revisar vulnerabilidades das dependências |

## Fluxo de mudança

1. ler `AGENTS.md` e `docs/README.md`;
2. alterar o menor conjunto coerente;
3. atualizar documentação e changelog;
4. executar `npm run check`;
5. iniciar `npm run dev`;
6. validar o comportamento afetado;
7. para UI, testar 390, 768 e 1440 px;
8. revisar `git status` e confirmar que fontes locais não serão publicadas.

## Ausência de build

O site não possui build de produção. `public/` já é o artefato final. O
processamento de imagens é explícito e só deve ser executado quando as fontes ou
formatos mudarem.
