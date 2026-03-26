# 🇧🇷 Minha Seleção — Copa do Mundo 2026

Monte sua convocação e escalação da Seleção Brasileira para a Copa do Mundo 2026.

## Funcionalidades

- ✅ Convocação de 26 jogadores com busca por nome
- ✅ Escalação com 4 formações táticas (4-3-3, 4-4-2, 3-5-2, 4-2-3-1)
- ✅ Definição de capitão com braçadeira
- ✅ Validação de posições
- ✅ Card de compartilhamento (copiar texto ou salvar imagem)

## Stack

| Serviço | Plano gratuito |
|---|---|
| Next.js 14 | Open source |
| Vercel | Hobby (gratuito) |
| API-Football | 100 req/dia grátis |
| Claude API | Pay-as-you-go (~R$0,01/análise) |
| html2canvas | Open source |

---

## Como rodar localmente

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Abra `.env.local` e preencha:

```env
# Obtenha em: https://dashboard.api-football.com/
API_FOOTBALL_KEY=sua_chave_aqui

# Obtenha em: https://console.anthropic.com/
ANTHROPIC_API_KEY=sua_chave_aqui
```

> **Sem as chaves:** O app funciona sem elas, mas a busca de jogadores usará apenas o modo mockado.

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## Deploy na Vercel (gratuito)

### Opção 1: Via CLI

```bash
npm install -g vercel
vercel
```

### Opção 2: Via GitHub

1. Suba o projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e importe o repositório
3. Na etapa de configuração, adicione as variáveis de ambiente:
   - `API_FOOTBALL_KEY`
   - `ANTHROPIC_API_KEY`
4. Clique em **Deploy**

Pronto! Seu site estará em `https://minha-selecao.vercel.app` (ou similar).

---

## Estrutura do projeto

```
src/
├── app/
│   ├── api/
│   │   ├── players/route.ts   ← Busca de jogadores (API-Football + Claude fallback)
│   │   └── analyze/route.ts   ← Análise tática com Claude
│   ├── layout.tsx
│   └── page.tsx               ← Orquestrador dos 3 passos
├── components/
│   ├── StepBar.tsx
│   ├── Step1Convocacao.tsx
│   ├── Step2Escalacao.tsx
│   ├── Step3Compartilhar.tsx
│   ├── Field.tsx              ← Campo tático
│   └── PlayerSearchModal.tsx  ← Modal de busca de jogadores
└── lib/
    ├── types.ts               ← Tipos TypeScript
    └── constants.ts           ← Formações, posições, ícones
```

---

## Próximos passos (Fase 2)

- [ ] Login com Google (Supabase Auth)
- [ ] Salvar escalações no banco (Supabase)
- [ ] Ranking dos jogadores mais convocados pelos fãs
- [ ] Comparar com a escalação oficial do técnico
=======
# Brasil-lineup
>>>>>>> b86d27a4dfbfc1d06eec8eccd9863cb1285f8aac
