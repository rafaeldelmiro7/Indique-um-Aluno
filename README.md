# Indique um Aluno

Landing + sistema de indicação de alunos para uma rede de escolas. Fluxo:
site público → formulário único (dados do parceiro + dados do aluno
indicado) → painel do admin da rede com todas as indicações. Quem indicou
também pode consultar o status da própria indicação em `/status`, informando
o CPF usado no cadastro.

## Stack

- React + Vite + TypeScript + Tailwind (SPA)
- Firebase Authentication (só para login do admin) + Firestore (banco de dados)
- Cloudflare Pages (hospedagem) + Cloudflare Pages Functions (endpoint público
  de indicação, que grava no Firestore via Admin SDK/REST API para não expor
  escrita pública direta no banco)

## Setup do Firebase

1. Crie um projeto em https://console.firebase.google.com.
2. **Authentication** → Sign-in method → ative **E-mail/senha**.
3. **Firestore Database** → criar banco (modo produção).
4. Publique as regras deste repositório: copie o conteúdo de
   [`firestore.rules`](firestore.rules) no console (Firestore → Regras) ou via
   Firebase CLI: `firebase deploy --only firestorerules` (requer
   `firebase init` apontando para este projeto).
5. Cadastre as unidades da rede na coleção `schools` (campos: `name`, `slug`,
   `active: true`). Sem isso o formulário de indicação não tem unidade para
   escolher. Duas formas de fazer isso:
   - **Manual**: no console do Firebase (Firestore → Iniciar coleção
     `schools`), criando um documento por escola.
   - **Script** (já traz as 5 unidades da rede pré-cadastradas em
     [`scripts/seed-schools.mjs`](scripts/seed-schools.mjs)): baixe a chave de
     conta de serviço (passo 8 abaixo), salve como `serviceAccountKey.json` na
     raiz do projeto (já está no `.gitignore`) e rode:
     ```bash
     npm run seed:schools
     ```
6. Para promover um admin: crie a conta em Authentication (manualmente ou pelo
   próprio console), pegue o `uid` e crie um documento `admins/{uid}`
   (qualquer conteúdo, só a existência do doc importa).
7. Em **Configurações do projeto → Seus apps → Web**, copie as chaves para o
   `.env.local` (veja `.env.example`).
8. **Configurações do projeto → Contas de serviço**, gere uma nova chave
   privada (JSON). Você vai precisar de `client_email`, `private_key` e
   `project_id` dela para os secrets da Cloudflare Function (próxima seção).

## Setup do Cloudflare Pages

1. Conecte o repositório no Cloudflare Pages.
2. Build command: `npm run build` — Output directory: `dist`.
3. O diretório `functions/` é detectado automaticamente pelo Pages e publicado
   como Pages Functions (rotas `/api/submit-referral` e `/api/check-status`).
4. Variáveis de ambiente do **build** (Settings → Environment variables): as
   mesmas `VITE_FIREBASE_*` do `.env.example`.
5. **Secrets** da Function (não confundir com as variáveis de build — essas
   são lidas em runtime pela function, nunca expostas ao client):
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY` (cole o valor de `private_key` do JSON da conta de
     serviço; mantenha os `\n` literais — o código já converte para quebras de
     linha reais)

## Desenvolvimento local

```bash
npm install
cp .env.example .env.local   # preencha com as chaves do seu projeto Firebase
npm run dev
```

Isso roda só o Vite — bom para mexer na interface, mas **as rotas `/api/*`
(Cloudflare Functions) não existem** nesse modo, então formulário de
indicação e consulta de status vão dar erro ao enviar.

### Testar as Functions localmente (envio de indicação, consulta de status)

Precisa do `serviceAccountKey.json` (mesmo arquivo usado no `seed:schools`,
veja acima) na raiz do projeto. Depois:

```bash
npm run gen:dev-vars   # gera o .dev.vars a partir do serviceAccountKey.json
npm run preview:pages  # builda e sobe com wrangler pages dev (porta 8788)
```

O `.dev.vars` não é versionado. Se precisar recriar (ex.: trocou de conta de
serviço), rode `npm run gen:dev-vars` de novo — o script já escapa a chave
privada corretamente numa linha só (`\n` literal), que é o formato que o
`wrangler` espera; colar a chave manualmente com quebras de linha reais
quebra o parser e dá erro `Invalid PKCS8 input`.

## Segurança

- O formulário público (`/cadastro`) nunca escreve direto no Firestore — ele
  chama `POST /api/submit-referral`, que valida os dados (inclusive CPF e
  e-mail) e grava usando a conta de serviço (Admin, via REST API do Firestore
  assinado com Web Crypto — compatível com o runtime de Cloudflare
  Workers/Pages).
- A consulta de status (`/status`) também não lê o Firestore direto do
  client — chama `POST /api/check-status`, que valida o CPF e devolve **só**
  as indicações daquele CPF (a Function filtra no servidor; o client nunca
  tem acesso de leitura à coleção inteira).
- `firestore.rules` bloqueia `create` em `referrals` a partir do client;
  leitura é restrita a admins.
- Papel de admin é um simples allow-list (`admins/{uid}`), sem UI de gestão
  nesta primeira versão — promova/revogue manualmente no console do Firebase.

## Estrutura

```
src/
  pages/       páginas (Landing, Cadastro, Status, Regulamento, AdminLogin,
               AdminDashboard)
  components/  componentes de UI compartilhados
  lib/         acesso a Firestore, tipos, validação de CPF
  hooks/       useAuth
functions/
  api/submit-referral.ts   Cloudflare Pages Function pública (grava indicação)
  api/check-status.ts      Cloudflare Pages Function pública (consulta por CPF)
  lib/firebaseAdmin.ts     JWT + REST API do Firestore (sem SDK Admin/Node)
  lib/validation.ts        validação de CPF/e-mail no servidor
scripts/
  seed-schools.mjs         popula a coleção schools
  check-admin-setup.mjs    lista usuários do Auth e status de admin
  gen-dev-vars.mjs         gera .dev.vars a partir do serviceAccountKey.json
firestore.rules
```
