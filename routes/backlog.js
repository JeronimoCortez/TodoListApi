import express from "express";
import {
  getBacklog,
  postBacklog,
  putTaskToBacklog,
} from "../controllers/backlogController.js";

export const backlogRouter = express.Router();

backlogRouter.get("/", getBacklog);

backlogRouter.post("/", postBacklog);

backlogRouter.put("/addTask/:idTask", putTaskToBacklog);
