import "reflect-metadata";
import { DataSource } from "typeorm";
import { Payment, PaymentSchema } from "./entities/payment.entity";

const url = process.env.DATABASE_URL;

declare global {
  var _typeormDataSource: DataSource | undefined;
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: url || "postgresql://dummy", // Fallback for build time if env is missing
  synchronize: true, // Creates tables and columns automatically
  logging: false,
  entities: [PaymentSchema],
  migrations: [],
  subscribers: [],
  ssl: {
    rejectUnauthorized: false, // Required for Neon PostgreSQL
  },
});

export async function getDataSource(): Promise<DataSource> {
  if (!url) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._typeormDataSource) {
      global._typeormDataSource = AppDataSource;
      await AppDataSource.initialize();
    } else if (!global._typeormDataSource.isInitialized) {
      await global._typeormDataSource.initialize();
    }
    return global._typeormDataSource;
  } else {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    return AppDataSource;
  }
}
