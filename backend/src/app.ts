import express, { Application, NextFunction, Request, Response } from "express";
import createHttpError, { isHttpError } from "http-errors";
import mongoose from "mongoose";
import session, { SessionOptions } from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import config from "./config";

import todoRouter from "./routes/todo.routes";
import userRouter from "./routes/user.routes";
import path from "path";
const app: Application = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith("/api")) {
    next();
  } else {
    return res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
  }
});

const whitelist = [config.CLIENT_URL];
const corsOptions: cors.CorsOptions = {
  credentials: true, // This is important.
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
const sessionOptions: SessionOptions = {
  secret: config.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: config.MONGO_URI,
    ttl: 14 * 24 * 60 * 60,
  }),
};

if (config.NODE_ENV === "production") {
  app.set("trust proxy", 1);
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
