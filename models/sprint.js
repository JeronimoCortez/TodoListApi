import mongoose from "mongoose";

const sprintSchema = mongoose.Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  inicio: { type: String, required: true },
  fin: { type: String, required: true },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const Sprint = mongoose.model("Sprint", sprintSchema);
