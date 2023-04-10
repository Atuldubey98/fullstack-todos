import * as dotenv from "dotenv";
import path from "path";

dotenv.config({
  path : path.resolve(process.cwd(), "../.env")
});
console.log(process.env.HELLO, process.cwd());
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 9000;
const MONGO_URI: string = process.env.MONGO_URI || "";
const SESSION_SECRET = process.env.SESSION_SECRET || "session_secret";
const NODE_ENV: string = process.env.NODE_ENV || "development";
const SESSION_NAME: string = process.env.SESSION_NAME || "session_name";
const CLIENT_URL: string = process.env.CLIENT_URL || "http://localhost:5173";
const config = {
  PORT,
  MONGO_URI,
  SESSION_SECRET,
  NODE_ENV,
  SESSION_NAME,
  CLIENT_URL,
};

export default config;
