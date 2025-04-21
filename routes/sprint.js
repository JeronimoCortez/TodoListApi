import express from "express";

const router = express.Router();

router.get("/sprints", (req, res) => {
  try {
    const sprints = sprint.find();
    if (sprints.length === 0) {
      return res
        .status(204)
        .json({ message: "No hay sprints en la base de datos" });
    }
    return res.status(200).json(sprints);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get("/sprints/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sprintById = await sprint.findById(id);

    if (!sprintById) {
      return res
        .status(204)
        .json({ message: `No se encontraron sprints con id: ${id}` });
    }
    return res.status(200).json(sprintById);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/sprints", (req, res) => {
  try {
    const { id, nombre, inicio, fin, tasks, color } = req.params;

    if (!id || !nombre || !inicio || !fin) {
      return res
        .status(400)
        .json({ message: "Debe enviar los campos obligatorios" });
    }

    const sprintData = {
      id,
      nombre,
      inicio,
      fin,
      tasks,
      color,
    };

    const data = sprintData.save();
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/sprints/:id", (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedSprint = sprint.findByIdAndUpdated(id, updatedData, {
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
});

router.delete("/sprints/:id", (req, res) => {
  try {
    const { id } = req.params;

    const deletedSprint = sprint.findByIdAndDeleted(id);

    if (!deletedSprint) {
      return res.status(204).json({ message: "Sprint no encontrada" });
    }

    return res.status(201).json(deletedSprint);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.put("/sprints/:id/addTaks/:idTask", (req, res) => {
  try {
    const { id, idTask } = req.params;
    const sprintById = sprint.findById(id);
    const taskById = task.findById(idTask);

    if (!sprintById || !taskById) {
      return res.status(204).json({ message: "Tarea o sprint no encontrado" });
    }

    const updatedData = sprintById.tasks.push(taskById);
    const updatedSprint = sprint.findByIdAndUpdated(id, updatedData, {
      new: true,
      runValidators: true,
    });
    return res.status(201).json(updatedSprint);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
