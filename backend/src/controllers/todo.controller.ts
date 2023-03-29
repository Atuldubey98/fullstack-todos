import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Todo from "../models/Todo";

class TodoController {
  /**
   * createTodo
   */
  public static async createTodo(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newTodo = new Todo({ userId: req.session.user!._id, ...req.body });
      await newTodo.save();
      res.status(201).send(newTodo);
    } catch (error) {
      next(error);
    }
  }
  public static async getTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const now = new Date();
      const $gte = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todos = await Todo.find({
        createdAt: { $gte },
        userId: req.session.user!._id,
      });
      return res.status(200).send({ data: todos, total: todos.length });
    } catch (error) {
      next(error);
    }
  }
  public static async updateTodoById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const _id: string = req.params.id || "";
      if (!_id) {
        throw createHttpError(400, "TODO_PAYLOAD_ERROR");
      }
      const todo = await Todo.findByIdAndUpdate(
        _id,
        { ...req.body },
        { new: true }
      );
      if (!todo) {
        throw createHttpError(400, "TODO_NOT_FOUND");
      }
      return res.status(200).send(todo);
    } catch (error) {
      next(error);
    }
  }
  public static async deleteTodoById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const _id: string = req.params.id || "";
      if (!_id) {
        throw createHttpError(400, "TODO_PAYLOAD_ERROR");
      }
      const todo = await Todo.findByIdAndDelete(_id);
      if (!todo) {
        throw createHttpError(400, "TODO_NOT_FOUND");
      }
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
}
export default TodoController;
