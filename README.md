# To-Do App

[![licence mit](https://img.shields.io/badge/licence-MIT-blue.svg)](./LICENSE)

## App structure
- `backend/` - The project backend, make with Express and TypeScript.
- `frontend/` - The project frontend, React application based on Vite.

## How to run

### Requirements
You must have the `Node.js` version v24 LTS with the `pnpm` version 11.
- [Node v24 LTS with pnpm](https://nodejs.org/pt-br/download)

### Clone the repository
```bash
git clone https://github.com/rf4elo/to-do-app.git
```

### Create the ".env" files
On the `backend/` folder, create a ".env" file and set these variables:
```env
API_KEY=(my-api-key-very-long)
JWT_KEY=(my-jwt-key-very-long)

DATABASE_URL="(my-postgresql-database-url)"
```

On the `frontend/` folder, create a ".env" file and set this variable:
```env
VITE_API_KEY=(my-api-key-very-long)
```
#### Obs:
1. The `API_KEY` on the backend ".env" and the `VITE_API_KEY` on the frontend ".env" must be the same.
2. The database must to be a PostgreSQL.

### Install dependences
On the main project folder, run it:
```bash
pnpm install

# Install the backend dependences
cd backend && pnpm install

# Install the frontend dependences
cd .. && cd frontend && pnpm install
```

### Generate prisma client
To genereate the prisma client, run:
```bash
pnpm dlx prisma generate

# If necessary, select the "Prisma Engine" option and press Enter.
```

### Generate a migrate
To generate a prisma migrate, run:
```bash
pnpm prisma migrate dev --name (migrate-name)
# Migrate name example: creating-tables
```

### Run in dev mode

#### Run all stacks simultaneously
To run in dev mode, on the main project folder, run:
```bash
pnpm dev
```

#### Run each stack separately
If you want to run each stack separately:
```bash
# Run the backend
pnpm dev:backend

# Run the frontend
pnpm dev:frontend
```

### Build and Start

#### Build and Start all stacks simultaneously
To build and start, on the main project folder, run:
```bash
# Build
pnpm build

# Start
pnpm start
```

#### Build and Start each stack separately
To Build and Start each stack separately:
```bash
# Build
pnpm build:backend
pnpm build:frontend

# Start
pnpm start:backend
pnpm start:frontend
```

## Project License
- [MIT License](./LICENSE)

## Professional contact
- [Github](https://github.com/rf4elo)
