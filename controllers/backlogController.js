import { Backlog } from "../models/backlog.js";
import { Task } from "../models/task.js";

export const getBacklog = async (req, res) => {
  try {
    const backlog = await Backlog.findOne().populate("tasks");

    if (backlog.length === 0) {
      return res.status(204).json({ message: "El backlog está vacío" });
    }

    return res.status(200).json(backlog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const postBacklog = async (req, res) => {
  try {
    const exists = await Backlog.findOne();
    if (exists) {
      return res.status(400).json({ message: "Ya existe un backlog" });
    }

    const newBacklog = new Backlog({ tasks: [] });
    const saved = await newBacklog.save();

    res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const putTaskToBacklog = async (req, res) => {
  try {
    const { idTask } = req.params;
    const taskBd = await Task.findOne({ id: idTask });
    if (!taskBd) {
      return res
        .status(204)
        .json({ message: "No se encontro la tarea en la base de datos" });
    }

    const backlog = await Backlog.findOne();
    if (!backlog) {
      return res.status(404).json({ message: "No existe backlog" });
    }

    const tasksInBacklog = await backlog.tasks.includes(taskBd._id);

    if (tasksInBacklog) {
      return res
        .status(400)
        .json({ message: "La tarea ya esta en el backlog" });
    }

    backlog.tasks.push(taskBd._id);
    const updatedBacklog = await backlog.save();
    return res.status(201).json(updatedBacklog);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
