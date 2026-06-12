import "reflect-metadata";
import { DataSource } from "typeorm";
import { PaymentSchema } from "./entities/payment.entity";

declare global {
  var _typeormDataSource: DataSource | undefined;
}

export async function getDataSource(): Promise<DataSource> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  if (!global._typeormDataSource) {
    global._typeormDataSource = new DataSource({
      type: "postgres",
      url: url,
      synchronize: true,
      logging: false,
      entities: [PaymentSchema],
      ssl: {
        rejectUnauthorized: false, // Required for Neon PostgreSQL
      },
    });
  }

  if (!global._typeormDataSource.isInitialized) {
    await global._typeormDataSource.initialize();
  }

  return global._typeormDataSource;
}

