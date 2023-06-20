import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ObjectId } from "mongodb";
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
      const result = await Todo.aggregate([
        {
          $match: {
            $text: { $search: word },
            userId: new ObjectId(req.session.user!._id),
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            todos: {
              $push: {
                userId: "$userId",
                complete: "$complete",
                title: "$title",
                content: "$content",
                createdAt: "$createdAt",
                updatedAt: "$updatedAt",
              },
            },
          },
        },
        {
          $project: {
            createdAt: "$_id",
            todos: 1,
            _id: 0,
          },
        },
      ]);
      return res.status(200).send(result);
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
      console.log(queryString);
      
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
        throw createHttpError(404, "TODO_NOT_FOUND");
      }
      return res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}
export default TodoController;
