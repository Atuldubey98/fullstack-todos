import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.routes";
import createHttpError, { isHttpError } from "http-errors";
import session, { SessionOptions } from "express-session";
import config from "./config";
import MongoStore from "connect-mongo";
import todoRouter from "./routes/todo.routes";
import mongoose from "mongoose";
import cors from "cors";
const app: Application = express();
const origins: string[] =
  config.NODE_ENV === "development"
    ? [
        "http://localhost:5173",
        "http://127.0.0.1:9000",
        "http://localhost:4173",
      ]
    : ["http://localhost:4173"];
app.use(express.json());
const corsOptions = {
  credentials: true, // This is important.
  origin: (origin: any, callback: any) => {
    if (!origin || origins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));
const sessionOptions: SessionOptions = {
  name: config.SESSION_NAME,
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 14 * 24 * 60 * 60 * 1000,
    domain:
      config.NODE_ENV === "development"
        ? "localhost"
        : process.env.COOKIE_DOMAIN,
    httpOnly: false,
  },
  store: MongoStore.create({
    mongoUrl: config.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
  }),
};
if (config.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  sessionOptions!.cookie!.secure = true;
}
app.use(session(sessionOptions));

app.get("/health", (req: Request, res: Response) => {
  return res.status(200).send("Server is running");
});
app.use("/api/v1/users", userRouter);
app.use("/api/v1/todos", todoRouter);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createHttpError(404, "NOT_FOUND"));
});
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "An unknown error occured.";
  let statusCode = 500;
  if (error instanceof mongoose.Error) {
    errorMessage = error.message;
    statusCode = 400;
  }
  if (isHttpError(error)) {
    errorMessage = error.message;
    statusCode = error.statusCode;
  }
  return res.status(statusCode).json({ errorMessage });
});
export default app;
