import { DataSource } from "typeorm";
import "dotenv/config";
import { urlEntity } from "../url/url.entity.js";

export const appDataSource = new DataSource({
  type: "postgres",
  database: process.env.DATABASE,
  username: process.env.DB_USERNAME,
  port: Number(process.env.DB_PORT || 5432),
  host: process.env.DB_HOST || "localhost",
  password: process.env.DB_PASSWORD,
  entities: [urlEntity],
  synchronize: true,
});