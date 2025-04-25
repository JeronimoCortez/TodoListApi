import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";

export const taskRouter = express.Router();

taskRouter.get("/", getTasks);

taskRouter.get("/:id", getTask);

taskRouter.post("/", createTask);

taskRouter.put("/:id", updateTask);

taskRouter.delete("/:id", deleteTask);
