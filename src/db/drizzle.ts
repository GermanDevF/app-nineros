import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, QueryResult } from "pg";
import * as schema from "./schema";
import { Logger } from "drizzle-orm";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, logger: true });
