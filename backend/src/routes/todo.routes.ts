import { Router } from "express";
import TodoController from "../controllers/todo.controller";
import isAuthenticated from "../middlewares/isAuthenticated";

const todoRouter: Router = Router();

todoRouter.post("/", isAuthenticated, TodoController.createTodo);
todoRouter.get("/", isAuthenticated, TodoController.getTodos);
todoRouter.put("/:id", isAuthenticated, TodoController.updateTodoById);
todoRouter.delete("/:id", isAuthenticated, TodoController.deleteTodoById);
export default todoRouter;
