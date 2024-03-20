import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_HOST) : 5433,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "competition",
  synchronize: true,
  logging: ["error"],
  entities: [__dirname + "/entity/*.{js,ts}"],
  migrations: [],
  subscribers: [],
});
