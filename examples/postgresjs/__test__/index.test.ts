import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import db, { migrationConnection, queryConnection } from "../src/db";
import { user } from "../src/schema";

describe("Logic", () => {
  beforeAll(async () => {
    await migrate(drizzle(migrationConnection), {
      migrationsFolder: "drizzle",
    });
    await migrationConnection.end();
  });

  it("adds numbers correctly", async () => {
    await db.insert(user).values({ name: "test" });
    expect((await db.select().from(user)).length).toEqual(1);
  });

  afterAll(async () => {
    queryConnection.end();
  });
});
