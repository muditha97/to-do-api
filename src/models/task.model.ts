// src/models/Task.ts
import mongoose, { Document } from "mongoose";

interface ITask extends Document {
  title: string;
  description: string;
  createdDate: Date;
  completedDate: Date;
  completed: boolean;
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  createdDate: { type: String },
  completedDate: { type: String },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
