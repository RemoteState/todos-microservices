import { Request, Response } from "express";
import { TodoData } from "../data";
import { Types } from "mongoose";

interface TodoInterface {
  user: Types.ObjectId;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  _id: Types.ObjectId;
}

export class Todos {
  static async getAll(req: Request, res: Response) {
    try {
      const todos: TodoInterface[] = await TodoData.getAll(req.user._id);
      res.status(200).json({
        data: todos,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async getOneById(req: Request, res: Response) {
    try {
      const todo: TodoInterface = await TodoData.getOneById(
        req.params.id,
        req.user._id
      );
      if (!todo) {
        return res.status(404).json({
          msg: `todo not found with this id ${req.params.id}`,
        });
      }
      res.status(200).json({
        data: todo,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const todo: TodoInterface = await TodoData.create({
        ...req.body,
        user: req.user._id,
      });
      res.status(200).json({
        msg: "todo inserted",
        _id: todo._id,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async findOneAndUpdate(req: Request, res: Response) {
    try {
      const todo: TodoInterface = await TodoData.findOneAndUpdate(
        req.params.id,
        req.user._id,
        { ...req.body }
      );
      if (!todo) {
        return res.status(404).json({
          msg: `task doesn't exist with id ${req.params.id}`,
        });
      }
      res.status(200).json({
        data: todo,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }

  static async findOneAndDelete(req: Request, res: Response) {
    try {
      const todo: TodoInterface = await TodoData.findOneAndDelete(
        req.params.id,
        req.user._id
      );
      if (!todo) {
        return res.status(404).json({
          msg: `task doesn't exist with id ${req.params.id}`,
        });
      }
      res.status(200).json({
        msg: "todo is deleted Successfully",
        _id: todo._id,
      });
    } catch (err: any) {
      res.status(500).json({
        error: err.message,
      });
    }
  }
}
