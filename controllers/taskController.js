import { Task } from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay tareas en la base de datos" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;
    const taskById = await Task.findOne({ id });

    if (!taskById) {
      return res
        .status(204)
        .json({ message: `No se encontraron tareas con id: ${id}` });
    }
    return res.status(200).json(taskById);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const createTask = async (req, res) => {
  try {
    const { id, titulo, descripcion, estado, fechaLimite } = req.body;

    if (!id || !titulo || !estado || !fechaLimite) {
      return res
        .status(400)
        .json({ message: "Debe enviar los campos obligatorios" });
    }

    const task = new Task({
      id,
      titulo,
      descripcion,
      estado,
      fechaLimite,
    });

    const data = await task.save();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTask = await Task.findOneAndUpdate({ id }, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(204).json({ message: "Tarea no actualizada" });
    }

    return res.status(201).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = Task.findByIdAndDeleted(id);

    if (!deletedTask) {
      return res.status(204).json({ message: "Tarea no encontrada" });
    }

    return res.status(201).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
