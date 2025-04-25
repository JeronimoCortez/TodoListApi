import mongoose from "mongoose";

const backlogSchema = mongoose.Schema({
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

export const Backlog = mongoose.model("Backlog", backlogSchema);
