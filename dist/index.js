"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const task_model_1 = __importDefault(require("./models/task.model"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV || "dev";
mongoose_1.default.connect(environment === "dev"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_STAGING);
const cors = require("cors");
app.use(cors());
app.use(express_1.default.json());
// Get all tasks
app.get("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield task_model_1.default.find();
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Get task by id
app.get("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const task = yield task_model_1.default.findById(id);
        if (task) {
            res.json(task);
        }
        res.status(404);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Create a task
app.post("/tasks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const task = new task_model_1.default({ title, description });
        task.createdDate = new Date();
        yield task.save();
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Update a task
app.patch("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, completedDate, completed } = req.body;
        const task = yield task_model_1.default.findByIdAndUpdate(id, {
            title,
            description,
            completedDate: completed ? new Date() : null,
            completed,
        }, { new: true });
        res.json(task);
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
// Delete a task
app.delete("/tasks/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield task_model_1.default.findByIdAndDelete(id);
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
