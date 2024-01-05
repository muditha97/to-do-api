"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Task.ts
const mongoose_1 = __importDefault(require("mongoose"));
const taskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    createdDate: { type: String },
    completedDate: { type: String },
    completed: { type: Boolean, default: false },
});
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
