# Banco de Questões AI

Aplicativo de estudos para concursos com foco em banco de questões, filtros, resolução individual, placar, histórico por questão, comentário detalhado e dashboard.

## Funcionalidades do MVP

- Modo de responder questões uma por vez
- Filtros por palavra-chave, matéria e tema
- Placar de acertos, erros e questões resolvidas
- Histórico abaixo de cada questão com data, alternativa marcada e gabarito
- Botão de resposta detalhada após responder
- Cadastro de questões de múltipla escolha
- Cadastro de questões de Certo/Errado
- Dashboard de desempenho
- Estrutura inicial para Supabase e Electron

## Rodar localmente

```bash
npm install
npm run dev
```

Depois abra:

```text
http://localhost:3000
```

## Gerar versão estática

```bash
npm run build
```

A versão exportada fica em `out/index.html`.

## Gerar app desktop com Electron

```bash
npm install
npm run dist
```

O instalador será criado na pasta `dist/`.
