// src/index.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./models/task.model";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI!);

app.use(express.json());

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a task
app.patch("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
