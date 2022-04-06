import { TodoModel } from "../models";

export class TodoData {
  static async create(todo: Object) {
    return await TodoModel.create(todo);
  }

  static async getAll(userId: string) {
    return await TodoModel.find({
      user: userId,
    });
  }

  static async getOneById(id: string, userId: string) {
    return await TodoModel.findOne({
      _id: id,
      user: userId,
    });
  }

  static async findOneAndUpdate(id: string, userId: string, todo: Object) {
    return await TodoModel.findOneAndUpdate({ _id: id, user: userId }, todo, {
      new: true,
      runValidators: true,
    });
  }

  static async findOneAndDelete(id: string, userId: string) {
    return await TodoModel.findOneAndDelete({ _id: id, user: userId });
  }
}
