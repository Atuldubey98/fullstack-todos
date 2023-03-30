import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import ITodo from "../interfaces/ITodo";
import Todo from "../models/Todo";

class TodoController {
  public static async searchTodos(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const searchedTodos: any = await Todo.aggregate([
        {
          $match: {
            $or: [
              { content: { $regex: req.query.word } },
              { title: { $regex: req.query.word } },
            ],
          },
        },
      ]).sort({ createdAt: -1 });
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
