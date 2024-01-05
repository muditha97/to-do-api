// src/index.ts
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./models/task.model";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const environment = process.env.NODE_ENV || "dev";

mongoose.connect(
  environment === "dev"
    ? process.env.MONGO_URI_DEV!
    : process.env.MONGO_URI_STAGING!
);

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

// Get task by id
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (task) {
      res.json(task);
    }

    res.status(404);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a task
app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    task.createdDate = new Date();
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
    const { title, description, completedDate, completed } = req.body;
    const task = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        completedDate: completed ? new Date() : null,
        completed,
      },
      { new: true }
    );
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
