import express from "express";

const router = express.Router();

router.get("/tasks", (req, res) => {
  try {
    const tasks = task.find();
    if (tasks.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay tareas en la base de datos" });
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const taskById = await task.findById(id);

    if (!taskById) {
      return res
        .status(204)
        .json({ message: `No se encontraron tareas con id: ${id}` });
    }
    return res.status(200).json(taskById);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/tasks", (req, res) => {
  try {
    const { id, titulo, descripcion, estado, fechaLimite, color } = req.params;

    if (!id || !titulo || !estado || !fechaLimite) {
      return res
        .status(400)
        .json({ message: "Debe enviar los campos obligatorios" });
    }

    const taskData = {
      id,
      titulo,
      descripcion,
      estado,
      fechaLimite,
      color,
    };

    const data = taskData.save();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTask = task.findByIdAndUpdated(id, updatedData, {
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
});

router.delete("/tasks/:id", (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = task.findByIdAndDeleted(id);

    if (!deletedTask) {
      return res.status(204).json({ message: "Tarea no encontrada" });
    }

    return res.status(201).json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
