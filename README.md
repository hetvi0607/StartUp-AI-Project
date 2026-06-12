# StartupHub AI

Premium full-stack SaaS platform for founders to discover startup ideas, find co-founders, build teams, manage projects, chat in real time, connect with investors, and get AI startup guidance.

## Stack

- Next.js 15, React, TypeScript
- Tailwind CSS with ShadCN-style primitives
- Prisma and PostgreSQL
- NextAuth with Google, GitHub, and credentials auth
- Socket.io realtime server
- OpenAI API advisor and pitch deck generation
- Cloudinary configuration
- Framer Motion-ready design system and React Three Fiber 3D scenes

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start Postgres:

```bash
docker compose up -d
```

4. Generate and migrate the database:

```bash
npm run db:migrate
npm run db:seed
```

5. Run the web app and realtime server:

```bash
npm run dev
npm run server
```

The app runs at `http://localhost:3000`. The Socket.io server runs at `http://localhost:4000`.

Seed credentials:

- Email: `founder@startuphub.ai`
- Password: `startuphub123`

## Environment Variables

See `.env.example` for all required variables. OAuth login requires Google and GitHub credentials. AI features use `OPENAI_API_KEY`. Cloudinary is configured through `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`.

## Product Surface

- Landing page with interactive 3D AI core and startup galaxy
- Login and registration
- Dashboard with analytics, AI signal, fundraising pipeline, and Kanban
- Startup marketplace with filters and AI analysis path
- AI Startup Advisor
- Co-founder matching
- Team workspace
- Real-time chat via Socket.io
- Investor connect
- AI pitch deck generator
- Community forum
- User profile
- Admin panel

## API Routes

- `POST /api/register`
- `GET, POST /api/startups`
- `POST /api/advisor`
- `POST /api/pitch-decks`
- `GET, POST /api/messages`
- `GET /api/notifications`
- `GET, POST /api/forum`
- `POST /api/tasks`
- `GET /api/investors`
- `POST /api/profile`

## Deployment

Deploy the Next.js app to Vercel with a hosted PostgreSQL database. Run `prisma migrate deploy` during your release process if your platform does not run migrations automatically. Run the Socket.io server as a separate Node service on Render, Fly.io, Railway, or a container platform, then set `NEXT_PUBLIC_SOCKET_URL` to that service URL.
