import { Elysia, t } from "elysia";
import { getDatabase, migrate } from "./src/db";

const DEFAULT_PORT = 3000;
const MAX_PER_PAGE = 100;

migrate();
const database = getDatabase();

const app = new Elysia()
  .get("/health", () => ({ status: "ok" }))
  .get(
    "/transactions",
    ({ query, set }) => {
      const page = query.page ?? 1;
      const perPage = query.perPage ?? 20;
      const offset = (page - 1) * perPage;
      const search = query.search?.trim() ?? "";
      const searchPattern = `%${search}%`;
      const whereClause = search
        ? `WHERE ref_id LIKE ? COLLATE NOCASE
             OR recipient_name LIKE ? COLLATE NOCASE
             OR transfer_name LIKE ? COLLATE NOCASE
             OR COALESCE(note, '') LIKE ? COLLATE NOCASE`
        : "";
      const searchParameters = search ? [searchPattern, searchPattern, searchPattern, searchPattern] : [];
      const total = (
        database
          .query(`SELECT COUNT(*) AS count FROM transactions ${whereClause}`)
          .get(...searchParameters) as { count: number }
      ).count;
      const transactions = database
        .query(
          `SELECT ref_id AS refId, transfer_date AS transferDate,
             recipient_name AS recipientName, transfer_name AS transferName,
             amount, note
           FROM transactions
           ${whereClause}
           ORDER BY transfer_date DESC, id DESC
           LIMIT ? OFFSET ?`,
        )
        .all(...searchParameters, perPage, offset);

      set.headers["cache-control"] = "no-store";
      return {
        data: transactions,
        pagination: {
          page,
          perPage,
          total,
          totalPages: Math.ceil(total / perPage),
          hasNextPage: page * perPage < total,
          hasPreviousPage: page > 1,
        },
      };
    },
    {
      query: t.Object({
        page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
        perPage: t.Optional(t.Numeric({ minimum: 1, maximum: MAX_PER_PAGE, default: 20 })),
        search: t.Optional(t.String({ maxLength: 100 })),
      }),
    },
  )
  .listen(Number(process.env.PORT ?? DEFAULT_PORT));

console.log(`API running at ${app.server?.hostname}:${app.server?.port}`);
