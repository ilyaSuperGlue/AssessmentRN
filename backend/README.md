# AEON Bank assessment backend

Transaction list API built with Bun, Elysia, and SQLite.

## Run locally

```bash
bun install
bun run migrate
bun run dev
```

The API is available at `http://localhost:3000`.

## Run with Docker Compose

```bash
docker compose up --build
```

SQLite is persisted in the `sqlite-data` Docker volume.

## API

`GET /health`

`GET /transactions?page=1&perPage=20&search=john`

Transactions are sorted by `transferDate` descending. `perPage` accepts values from 1 to 100. `search` matches `refId`, `recipientName`, `transferName`, and `note` case-insensitively.

Search preserves the requested active `page` and `perPage` values. Pagination totals and page flags are recalculated for the filtered results.

The response contains `data` and `pagination` with `page`, `perPage`, `total`, `totalPages`, `hasNextPage`, and `hasPreviousPage`.

The migration creates the schema and seeds 200 Faker transactions only when the table is empty.
