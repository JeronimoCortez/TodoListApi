import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  id: { type: String, required: true },
  titulo: { type: String, required: [true, "El titulo es obligatorio"] },
  descripcion: String,
  fechaLimite: {
    type: String,
    required: [true, "La fecha limite es obligatoria"],
  },
  estado: {
    type: Number,
    enum: [0, 1, 2],
    default: 0,
  },
});

export const Task = mongoose.model("Task", taskSchema);
