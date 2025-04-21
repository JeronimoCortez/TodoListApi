import express from "express";

const router = express.Router();

router.get("/backlog", (req, res) => {
  try {
    const backlg = backlog.find();
    if (backlg.length === 0) {
      return res.status(204).json({ message: "El backlog esta vacio" });
    }
    return res.status(200).json(backlg);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.post("/backlog", (req, res) => {
  try {
    const { tasks } = req.params;

    if (!tasks) {
      res.status(204).json({ message: "Debe enviar la/s tareas" });
    }

    res.status(201).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put("/backlog/addTask/:idTask", (req, res) => {
  try {
    const { idTask } = req.params;
    const taskBd = task.findById(idTask);
    if (!taskBd) {
      return res
        .status(204)
        .json({ message: "No se encontro la tarea en la base de datos" });
    }

    const backlogUpdate = backlog.tasks.push(taskBd);
    return res.status(201).json(backlogUpdate);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
