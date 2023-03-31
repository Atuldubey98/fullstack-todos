import express, { Application, NextFunction, Request, Response } from "express";
import userRouter from "./routes/user.routes";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import config from "./config";
import MongoStore from "connect-mongo";
import todoRouter from "./routes/todo.routes";
import mongoose from "mongoose";
import cors from "cors";
const app: Application = express();

app.use(express.json());

const corsOptions = {
  credentials: true, // This is important.
  origin: (origin: any, callback: any) => {
    if (
      !origin ||
      ["http://localhost:5173", "http://127.0.0.1:9000"].includes(origin)
    ) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
};
app.use(cors(corsOptions));
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: new MongoStore({
      mongoUrl: config.MONGO_URI,
    }),
  })
);

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
