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
		// console.log("test: before transaction");
		// await db.transaction(async (tx) => {
		// 	console.log("test: exeucing transaction");
		// });
		// console.log("test: after transaction");
		await db.startTransaction();
	});

	it("adds numbers correctly", async () => {
		await db.insert(user).values({ name: "test" });
		expect((await db.select().from(user)).length).toEqual(1);
	});

	afterAll(async () => {
		await db.endTransaction(true);
		// await db.endTransaction(rollback: true);
		queryConnection.end();
	});
});
