# Coxipó Informática

Projeto completo em **Next.js + Prisma + PostgreSQL** para a loja online da Coxipó Informática.

## O que já vem pronto
- Loja online com identidade própria
- Botão de WhatsApp com o número `65 98142-7123`
- Login administrativo com sessão real via JWT
- Usuário administrador criado no seed
- Cadastro de novos usuários com níveis de permissão
- Dashboard administrativo
- Importação de produtos por CSV
- Aplicação automática de **25% de margem**
- Publicação direta dos produtos importados
- API para listar produtos publicados

## Perfis de acesso
- `ADMIN`
- `MANAGER`
- `OPERATOR`
- `FINANCE`

## Credenciais padrão do administrador
Essas credenciais podem ser alteradas no `.env`:

- **E-mail:** `admin@coxipoinformatica.com.br`
- **Senha:** `Coxipo@2026`

## 1) Configuração local
Crie um arquivo `.env` baseado em `.env.example`.

```bash
cp .env.example .env
```

Preencha principalmente:
- `DATABASE_URL`
- `JWT_SECRET`

## 2) Instalação
```bash
npm install
```

## 3) Banco de dados
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

## 4) Rodar localmente
```bash
npm run dev
```

Abra:
- Loja: `http://localhost:3000`
- Login: `http://localhost:3000/login`
- Admin: `http://localhost:3000/admin`

## Modelo de CSV
Há um modelo pronto em:

`public/examples/import-model.csv`

Colunas aceitas:
- `sku`
- `name`
- `description`
- `category`
- `brand`
- `supplier`
- `basePrice`
- `stock`
- `imageUrl`

## Deploy na Vercel
1. Suba o projeto para GitHub.
2. Importe o repositório na Vercel.
3. Configure as variáveis de ambiente iguais ao `.env.example`.
4. Use um PostgreSQL de produção, como:
   - Supabase
   - Neon
   - Railway
5. No terminal do projeto ou no banco, rode:

```bash
npx prisma db push
npm run db:seed
```

## Melhorias futuras já previstas
- checkout e pagamento
- frete
- cupons
- painel de pedidos
- banners dinâmicos
- descontos por perfil
- integração com ERP e API de fornecedores
