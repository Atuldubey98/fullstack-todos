import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 9000;
const MONGO_URI: string = process.env.MONGO_URI || "";
const SESSION_SECRET = process.env.SESSION_SECRET || "session_secret";
const NODE_ENV: string = process.env.NODE_ENV || "development";
const SESSION_NAME: string = process.env.SESSION_NAME || "session_name";
const config = { PORT, MONGO_URI, SESSION_SECRET, NODE_ENV, SESSION_NAME };

export default config;
