// src/models/Task.ts
import mongoose, { Document } from "mongoose";

interface ITask extends Document {
  title: string;
  completed: boolean;
}

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model<ITask>("Task", taskSchema);

export default Task;
