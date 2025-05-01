import express from "express";
import {
  addTaskToSprint,
  createSprint,
  deleteSprint,
  getSprint,
  getSprints,
  postTaskSprintToBacklog,
  updateSprint,
} from "../controllers/sprintController.js";

export const sprintRouter = express.Router();

sprintRouter.get("/", getSprints);

sprintRouter.get("/:id", getSprint);

sprintRouter.post("/", createSprint);

sprintRouter.put("/:id", updateSprint);

sprintRouter.delete("/:id", deleteSprint);

sprintRouter.put("/:id/addTask/:idTask", addTaskToSprint);

sprintRouter.put("/:idSprint/taskToBacklog/:idTask", postTaskSprintToBacklog);
