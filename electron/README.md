# Banco AI Electron

## Rodar desktop

```bash
npm install
npm run electron
```

## Gerar instalador Windows

```bash
npm run dist
```

O instalador sera criado na pasta `dist/`.

## Observacao

O Electron abre o export estatico do Next em `out/index.html`, entao rode `npm run build` antes de abrir o app desktop.
