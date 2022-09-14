require("dotenv").config();
import postgres from "postgres";

const db = postgres("postgres://username:password@host:port/database", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

export default db;
