import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
import path from "path";
const db = new Sequelize({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: +process.env.DB_PORT,
  dialect: "postgres",
  // models: [__dirname + "/../models/**/*.ts"],
  models: [path.join(__dirname, "../models/**/*.ts")],
  logging: false,
});

export default db;
