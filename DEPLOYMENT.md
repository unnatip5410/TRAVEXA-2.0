# TRAVEXA 2.0 deployment

TRAVEXA uses Next.js 16, Prisma 6, and PostgreSQL. Important user data belongs in PostgreSQL; browser localStorage is only used for presentation preferences such as theme, language, text size, and the first-visit welcome state.

## Required production environment

Set these variables in the hosting provider, never in committed files:

- `DATABASE_URL`: PostgreSQL connection string, for example `postgresql://.../travexa?schema=public&sslmode=require`
- `AUTH_SECRET`: long random secret used to sign HTTP-only sessions
- `SITE_URL`: canonical HTTPS site origin, used by metadata and the sitemap
- `NODE_ENV=production`
- `ADMIN_DEMO_PASSWORD`: unique 16+ character password for initial administrator provisioning by the seed

Optional AI provider variables:

- `TRAVEXA_AI_API_KEY`
- `TRAVEXA_AI_BASE_URL`
- `TRAVEXA_AI_MODEL` (defaults to `gpt-4o-mini` for OpenAI-compatible endpoints)

Razorpay hosted checkout is disabled until all of these are configured:

- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `RAZORPAY_WEBHOOK_SECRET`

No MAP API key is required for the current OpenStreetMap location embeds or external Google Maps directions links.

## Managed PostgreSQL setup

1. Create a PostgreSQL database with a managed provider such as Neon, Supabase, Railway, Render, or Amazon RDS.
2. Add the provider connection string as `DATABASE_URL`.
3. Deploy the application code.
4. Run migrations from the release environment:

```bash
npm ci
npm run db:generate
npm run db:migrate:deploy
npm run db:seed
npm run build
npm run start
```

`prisma migrate deploy` is the only migration command intended for production. Do not use `prisma db push` in production.

## Hosting

The app supports any Node host that can run the Next standalone server. The build emits `.next/standalone` because `next.config.ts` sets `output: "standalone"`.

For Vercel, connect the repository, set the environment variables, and configure the build command as `npm run build`. Run migrations in a deployment hook or a controlled release job before traffic is switched to the new version. Add the custom domain in the provider dashboard and update DNS records as instructed by the provider.

For Docker or a VM, run `npm run build`, then start `node .next/standalone/server.js`. Set `PORT` and `HOSTNAME` as required by the platform. Put TLS termination and the custom domain at the platform load balancer or reverse proxy.

## Admin access

Admin routes are protected twice:

- `src/proxy.ts` performs an early role check and redirects unauthenticated users to `/login`.
- `src/app/admin/page.tsx` performs a server-side role check before rendering.

The seed creates `admin@travexa.local` only when `ADMIN_DEMO_PASSWORD` is explicitly set. Set a unique 16+ character value in the deployment environment, run the seed once, then rotate the credential after signing in. The app has no default admin or traveller password.

## Data and secrets

- Passwords are bcrypt-hashed.
- Sessions are signed, HTTP-only, same-site cookies.
- Razorpay secrets are server-only; checkout collects payment information only on Razorpay-hosted UI.
- Payment receipts are created only after the payment is verified against Razorpay's API or signed webhook.
- Receipts, trips, travelers, enquiries, saved destinations, and reviews are stored in PostgreSQL through Prisma.
- If payment credentials are absent, checkout returns an unavailable response and never confirms a booking.
- The app adds per-process request limits to sign-in, sign-up, enquiries, reviews, checkout creation, and AI requests. Configure host/WAF rate limits as well because serverless instances do not share in-memory counters.
- Back up PostgreSQL before migrations and use the hosting provider's point-in-time recovery for rollback.

## Health check

`GET /api/health` checks both the application and PostgreSQL; it returns HTTP 503 when the database is unavailable.

## Local development with PostgreSQL

The production schema is PostgreSQL-first; SQLite is no longer supported by the Prisma contract. A reproducible Postgres container is included:

```bash
docker compose up -d postgres
cp .env.example .env
# Edit .env: set POSTGRES_PASSWORD to a unique local secret and set DATABASE_URL to
# postgresql://travexa:<that-password>@localhost:5432/travexa?schema=public
npm install
npm run db:migrate:deploy
npm run db:seed
npm run dev
```

## External integrations

The AI assistant calls an OpenAI-compatible endpoint when configured and labels its catalog-based fallback as local guidance. Flight and hotel results are still static example content and must not be used to transact. Map views use OpenStreetMap and open live external directions. To enable payments, create a Razorpay merchant account, configure the three Razorpay variables, and register `https://YOUR_DOMAIN/api/payments/webhook` for `payment.captured`, `payment.failed`, and `order.paid`; test with provider test credentials before switching to live credentials.

## Google Search Console

1. Set `SITE_URL` to the canonical HTTPS origin and deploy.
2. In Google Search Console, add the domain property and complete DNS TXT verification (or use the URL-prefix HTML verification option).
3. Submit `https://YOUR_DOMAIN/sitemap.xml` and review `https://YOUR_DOMAIN/robots.txt`.
4. Use URL Inspection on the home page, `/india/12-jyotirlingas`, and representative destination pages after deployment.

## Deployment commands

For a Node host or a controlled release job:

```bash
npm ci
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run lint
npm run build
npm run start
```

For Vercel, set the same environment variables in Project Settings, use `npm run build`, and run `npx prisma migrate deploy` plus the initial administrator seed in a one-time protected release job before serving authenticated traffic. Add the deployed HTTPS origin as `SITE_URL`. No public deployment has been performed from this workspace.
