import { Backlog } from "../models/backlog.js";
import { Sprint } from "../models/sprint.js";
import { Task } from "../models/task.js";

export const getSprints = async (req, res) => {
  try {
    const sprints = await Sprint.find().populate("tasks");
    if (sprints.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay sprints en la base de datos" });
    }
    return res.status(200).json(sprints);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getSprint = async (req, res) => {
  try {
    const { id } = req.params;
    const sprintById = await Sprint.findOne({ id });

    if (!sprintById) {
      return res
        .status(204)
        .json({ message: `No se encontraron sprints con id: ${id}` });
    }
    return res.status(200).json(sprintById);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createSprint = async (req, res) => {
  try {
    const { id, nombre, inicio, fin, tasks } = req.body;

    if (!id || !nombre || !inicio || !fin) {
      return res
        .status(400)
        .json({ message: "Debe enviar los campos obligatorios" });
    }

    const sprint = new Sprint({
      id,
      nombre,
      inicio,
      fin,
      tasks,
    });

    const data = await sprint.save();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateSprint = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedSprint = await Sprint.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedSprint) {
      return res.status(204).json({ message: "Sprint no actualizado" });
    }

    return res.status(201).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteSprint = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSprint = await Sprint.findOneAndDelete({ id });

    if (!deletedSprint) {
      return res.status(204).json({ message: "Sprint no encontrada" });
    }

    return res.status(201).json(deletedSprint);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addTaskToSprint = async (req, res) => {
  try {
    const { id, idTask } = req.params;
    const sprintById = await Sprint.findOne({ id });
    const taskById = await Task.findOne({ id: idTask });

    if (!sprintById || !taskById) {
      return res.status(404).json({ message: "Tarea o sprint no encontrado" });
    }

    sprintById.tasks.push(taskById);
    const updatedSprint = await Sprint.findOneAndUpdate(
      { id },
      { tasks: sprintById.tasks },
      {
        new: true,
        runValidators: true,
      }
    ).populate("tasks"); // populate es un metodo de mongoose, que en este caso nos sirve para que se guarde toda la task y no solo el id
    return res.status(201).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const postTaskSprintToBacklog = async (req, res) => {
  try {
    const { idTask, idSprint } = req.params;
    const task = await Task.findOne({ id: idTask });
    const sprint = await Sprint.findOne({ id: idSprint });
    const backlog = await Backlog.findOne();

    if (!task || !sprint || !backlog) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    sprint.tasks = sprint.tasks.filter((taskId) => !taskId.equals(task._id));
    await sprint.save();

    if (!backlog.tasks.includes(task._id)) {
      backlog.tasks.push(task._id);
      await backlog.save();
    }

    return res
      .status(200)
      .json({ message: "Tarea enviada al backlog exitosamente" });
  } catch (error) {}
};
