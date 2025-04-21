import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  id: { type: String, required: true },
  titulo: { type: String, required: [true, "El titulo es obligatorio"] },
  descripcion: String,
  estado: {
    type: String,
    enum: ["PENDIENTE", "EN_PROGRESO", "COMPLETADO"],
    default: "PENDIENTE",
  },
  fechaLimite: {
    type: String,
    required: [true, "La fecha limite es obligatoria"],
  },
  color: { type: String, default: "#FFFFFF" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
