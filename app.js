import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose
  .connect(process.env.DB_URL, { dbName: process.env.DB_NAME })
  .then(() => {
    console.log("Conexion a la base de datos exitosa");
  })
  .catch((error) => {
    console.log("Error al conectarse a la base de datos: ", error);
  });

app.listen(process.env.PORT, () => {
  console.log("Escuchando en puerto ", process.env.PORT);
});
