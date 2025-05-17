# nextjs-prisma-app

Simple full-stack application on Next.js with Prisma and Tailwind CSS for daily apdates.

## Описание

User can:
- Login (emulation with hardcoded `userId`)
- Send daily updates via the form on the home page
- View all your updates on the dashboard

API-route `/api/updates` processes:
- **POST**: saving a new update to the database
- **GET**: getting a list of user updates sorted by date (newest first)

> Used for styling - Tailwind CSS, to interact with DB — Prisma, for client request — SWR.

## Quick start

### 1. Clone repository

```bash
git clone https://github.com/OlenaBoichenko/Test_project_useHireUp.git
cd nextjs-prisma-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root with the line:

```env
DATABASE_URL="file:./prisma/dev.db"
```

> Default is SQLite. If necessary, you can connect PostgreSQL or another DBMS by changing `provider` and `DATABASE_URL` in `prisma/schema.prisma`.

### 4. Installation Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Launch the application

```bash
npm run dev
```

Open in browser: http://localhost:3000

## Project structure

```
nextjs-prisma-app/

prisma.ts          # initialization Prisma Client

schema.prisma      # model description Update
migrations/        # migration files

api/updates/       # API-route (GET, POST)

dashboard/         # dashboard

page.tsx           # main page

```

## Solution explanation

- **Next.js App Router**: all UI pages are located in `src/app`, API - in `src/app/api/updates/route.ts`.
- **Prisma + SQLite**: model `Update` stores `id`, `userId`, `content`, `createdAt`.
- **Authentication Emulation**: `userId = 'user123'` is hardcoded.
- **SWR**: lightweight client fetcher for getting a list of updates on the dashboard.
- **Tailwind CSS**: utilitarian framework for quick page design.

## Routes

| Route                | Metod | Description                    |
|----------------------|-------|--------------------------------|
| `/`                  | GET   | Form for submitting an update  |
| `/dashboard`         | GET   | List of all user updates       |
| `/api/updates`       | GET   | Get all updates                |
| `/api/updates`       | POST  | Create a new update            |

## License

MIT © Olena Boichenko