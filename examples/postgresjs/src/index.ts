import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { user } from "./schema";
import db, { migrationConnection } from "./db";

const main = async () => {
  await migrate(drizzle(migrationConnection), { migrationsFolder: "drizzle" });
  await migrationConnection.end();

  // await db.insert(user).values([{ name: 'alef' }, { name: 'bolk' }]);
  console.log(await db.select().from(user));
  process.exit(0);
};

main();
