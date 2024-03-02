import { drizzle } from "drizzle-orm/postgres-js";
import * as postgres from "postgres";

export const migrationConnection = postgres(process.env.DATABASE_URL!, {
  max: 1,
});
export const queryConnection = postgres(process.env.DATABASE_URL!);
const db = drizzle(queryConnection);

export default db;
