import { NextFunction, Request, RequestHandler, Response } from "express";
import createHttpError from "http-errors";

const isAuthenticated: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!("user" in req.session)) {
    next(createHttpError(401, "UNAUTHORIZED"));
  }
  next();
};

export default isAuthenticated;
