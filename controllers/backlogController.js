import { Backlog } from "../models/backlog.js";
import { Sprint } from "../models/sprint.js";
import { Task } from "../models/task.js";

export const getBacklog = async (req, res) => {
  try {
    let backlog = await Backlog.findOne();
    if (!backlog) {
      const newBacklog = new Backlog({ tasks: [] });
      await newBacklog.save();
    }

    await backlog.populate("tasks");

    if (backlog.tasks.length === 0) {
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

    let backlog = await Backlog.findOne();
    if (!backlog) {
      backlog = new Backlog({ tasks: [] });
      await backlog.save();
    }

    backlog.tasks.push(taskBd._id);
    let updatedBacklog = await backlog.save();
    updatedBacklog = await Backlog.findOneAndUpdate(
      { tasks: backlog.tasks },
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(201).json(updatedBacklog);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const postTaskBacklogToSprint = async (req, res) => {
  try {
    const { idTask, idSprint } = req.params;

    const task = await Task.findOne({ id: idTask });
    const sprint = await Sprint.findOne({ id: idSprint });
    const backlog = await Backlog.findOne();

    if (!task || !sprint || !backlog) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    backlog.tasks = backlog.tasks.filter((tId) => !tId.equals(task._id));
    await backlog.save();

    if (!sprint.tasks.includes(task._id)) {
      sprint.tasks.push(task._id);
      await sprint.save();
    }

    return res.status(200).json({
      message: "Tarea enviada al sprint exitosamente",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
