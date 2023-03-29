import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import ILoginUser from "../interfaces/ILoginUser";
import IUser from "../interfaces/IUser";
import User from "../models/User";
import * as bcryptjs from "bcryptjs";
declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
class UserController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    const { email, password }: ILoginUser = req.body;
    try {
      const existUser = await User.findOne({ email });
      if (!existUser) {
        throw createHttpError(400, "LOGIN_EMAIL_ERROR");
      }
      const matches = await bcryptjs.compare(password, existUser.password);
      if (!matches) {
        throw createHttpError(404, "LOGIN_PASSWORD_ERROR");
      }
      const user = { _id: existUser._id, name: existUser.name, email };
      req.session.user = user;
      return res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password, name }: IUser = req.body;
      const existUser = await User.findOne({ email });
      if (existUser) {
        throw createHttpError(400, "REGISTER_USER_EXISTS");
      }
      const passHash = await bcryptjs.hash(
        password,
        await bcryptjs.genSalt(10)
      );
      const user = new User({ email, password: passHash, name });
      const { _id } = await user.save();
      return res.status(201).send({ _id, email, name });
    } catch (error) {
      next(error);
    }
  }
  public static async currentUser(req: Request, res: Response) {
    return res.status(200).send(req.session.user);
  }
  /**
   * logout
   */
  public static logout(req: Request, res: Response, next: NextFunction) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        return res.sendStatus(200);
      }
    });
  }
}
export default UserController;
