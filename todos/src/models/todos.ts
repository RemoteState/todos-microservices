import mongoose, { Schema } from "mongoose";

const todDoSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("todo", todDoSchema);
