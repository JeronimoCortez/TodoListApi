import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { taskRouter } from "./routes/task.js";
import { sprintRouter } from "./routes/sprint.js";
import { backlogRouter } from "./routes/backlog.js";
dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Conexion a la base de datos exitosa");
  })
  .catch((error) => {
    console.log("Error al conectarse a la base de datos: ", error);
  });

app.use("/task", taskRouter);
app.use("/sprint", sprintRouter);
app.use("/backlog", backlogRouter);

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto ", process.env.PORT);
});
