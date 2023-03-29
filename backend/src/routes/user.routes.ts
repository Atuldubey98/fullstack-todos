import { Router } from "express";
import UserController from "../controllers/user.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter: Router = Router();

userRouter.post("/login", UserController.login);
userRouter.post("/register", UserController.register);
userRouter.get("/", isAuthenticated, UserController.currentUser);
userRouter.post("/logout", isAuthenticated, UserController.logout);

export default userRouter;
