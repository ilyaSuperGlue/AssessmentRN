import { Database } from "bun:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { faker } from "@faker-js/faker";

const databasePath = process.env.DATABASE_URL ?? "./data/assessment.sqlite";
const transferNames = ["Salary Payment", "Invoice Payment", "Refund", "Bonus Payment"] as const;
let database: Database | undefined;

export function getDatabase() {
  if (!database) {
    if (databasePath !== ":memory:") mkdirSync(dirname(databasePath), { recursive: true });
    database = new Database(databasePath, { strict: true });
    database.exec("PRAGMA journal_mode = WAL;");
    database.exec("PRAGMA foreign_keys = ON;");
  }
  return database;
}

export function migrate() {
  const db = getDatabase();
  db.exec(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ref_id TEXT NOT NULL UNIQUE,
      transfer_date TEXT NOT NULL,
      recipient_name TEXT NOT NULL,
      transfer_name TEXT NOT NULL CHECK (transfer_name IN ('Salary Payment', 'Invoice Payment', 'Refund', 'Bonus Payment')),
      amount REAL NOT NULL,
      note TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_transactions_transfer_date
      ON transactions (transfer_date DESC, id DESC);
  `);

  const row = db.query("SELECT COUNT(*) AS count FROM transactions").get() as { count: number };
  if (row.count > 0) return;

  const insert = db.prepare(`
    INSERT INTO transactions
      (ref_id, transfer_date, recipient_name, transfer_name, amount, note)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const seed = db.transaction(() => {
    for (let index = 0; index < 200; index += 1) {
      const transferDate = faker.date.between({
        from: "2024-01-01T00:00:00.000Z",
        to: "2024-12-31T23:59:59.999Z",
      });
      const transferName = faker.helpers.arrayElement(transferNames);
      const amount = Number(faker.finance.amount({ min: 10, max: 10000, dec: 2 }));
      insert.run(
        `${faker.string.alphanumeric({ length: 6, casing: "upper" })}${String(index).padStart(3, "0")}`,
        transferDate.toISOString(),
        faker.person.fullName(),
        transferName,
        transferName === "Refund" ? -amount : amount,
        faker.helpers.maybe(() => faker.lorem.sentence({ min: 3, max: 8 })) ?? null,
      );
    }
  });
  seed();
}
