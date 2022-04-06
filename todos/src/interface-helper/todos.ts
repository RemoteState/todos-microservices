import { Types } from "mongoose";
export interface TodoInterface {
  user: Types.ObjectId;
  title: string;
  description: string;
  createdAt?: string;
  dueDate: string;
  _id?: Types.ObjectId;
}
