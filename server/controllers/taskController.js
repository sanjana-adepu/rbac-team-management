const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {
    const { title, description, teamId } = req.body;

    const task = await Task.create({
      title,
      description,
      team: teamId,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const { teamId } = req.query;

    const tasks = await Task.find({ team: teamId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description } = req.body;
  
      const task = await Task.findByIdAndUpdate(
        taskId,
        { title, description },
        { new: true }
      );
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findByIdAndDelete(taskId);
  
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { createTask, getTasks, updateTask, deleteTask };