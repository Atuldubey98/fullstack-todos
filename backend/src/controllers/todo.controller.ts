import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import ITodo from "../interfaces/ITodo";
import Todo from "../models/Todo";
function getPreviousOrNextDate(checkDate: Date, payload: number): Date {
  const date = new Date();
  date.setDate(checkDate.getDate() + payload);
  return date;
}
class TodoController {
  public static async dashboardTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const notComplete = await Todo.count({
        userId: req.session.user!._id,
        complete: false,
        createdAt: {
          $lte: new Date(Date.now()),
          $gte: getPreviousOrNextDate(new Date(Date.now()), -7),
        },
      });
      const complete = await Todo.count({
        userId: req.session.user!._id,
        complete: true,
        createdAt: {
          $lte: new Date(Date.now()),
          $gte: getPreviousOrNextDate(new Date(Date.now()), -7),
        },
      });
      return res.status(200).send({ complete, notComplete });
    } catch (error) {
      next(error);
    }
  }
  public static async searchTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const word = typeof req.query.word === "string" ? req.query.word : "";
      const searchedTodos: ITodo[] = await Todo.find({
        $text: { $search: word },
        userId: req.session.user!._id,
      });
      const map = new Map<string, ITodo[]>();
      searchedTodos.forEach((todo: ITodo) => {
        const createdAt = new Date(todo?.createdAt)
          .toISOString()
          .substring(0, 10);
        if (!map.has(createdAt)) {
          const todos: ITodo[] = [todo];
          map.set(createdAt, todos);
        } else {
          map.get(createdAt)?.push(todo);
        }
      });
      const response: any = [];
      for (const [createdAt, todos] of map.entries()) {
        response.push({ createdAt, todos });
      }
      return res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
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
  //Backend working
  public static async getTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let queryString = JSON.stringify(req.query);
      queryString = queryString.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );
      const filter = JSON.parse(queryString);

      const todos = await Todo.find({
        ...filter,
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
      const todo = await Todo.findOneAndUpdate(
        { _id, userId: req.session.user!._id },
        { ...req.body },
        { new: true, runValidators: true }
      );
      if (!todo) {
        return res.status(404).send("TODO_NOT_FOUND");
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
      const todo = await Todo.findOneAndDelete({
        _id,
        userId: req.session.user!._id,
      });
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
