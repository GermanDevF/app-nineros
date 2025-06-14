import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

config({ path: ".env.local" });

const db = drizzle(process.env.DATABASE_URL!);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
  } catch (error) {
    console.error("Error migrating database");
    console.error(error);
    process.exit(1);
  }
};

main();
