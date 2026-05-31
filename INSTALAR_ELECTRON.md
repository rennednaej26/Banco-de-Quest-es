# Como gerar o instalador

1. Abra a pasta do projeto.
2. Instale as dependencias:

```bash
npm install
```

3. Gere a versao estatica:

```bash
npm run build
```

4. Gere o instalador Windows:

```bash
npm run dist
```

O arquivo final aparece na pasta `dist/`.

Observacao: no ambiente do Codex a internet local ficou bloqueada para baixar o Electron, entao a geracao do instalador precisa ser feita em um ambiente com acesso ao npm.
