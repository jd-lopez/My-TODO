const taskModel = require("../model/taskModel");

function getUserId(req) {
  // Keep compatibility with the older request field names used earlier in the project.
  return req.user?.id || req.userId?.id || req.userID?.id;
}

exports.createTask = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!text) {
      return res.status(400).json({ message: "Task text is required" });
    }

    const lastTask = await taskModel
      .findOne({ user: userId })
      .sort({ order: -1 });
    const nextOrder = lastTask ? lastTask.order + 1 : 0;

    const newTask = new taskModel({
      text,

      user: userId,
    });
    const saved = await newTask.save();

    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await taskModel.find({ user: userId }).sort({ order: 1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleted = await taskModel.findOneAndDelete({
      _id: id,
      user: userId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ id: deleted._id });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { status } = req.body || {};

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (status) {
      const allowedStatus = ["todo", "doing", "done"];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }

      // The same endpoint handles moving a task between columns when a status is provided.
      const updated = await taskModel.findOneAndUpdate(
        { _id: id, user: userId },
        { $set: { status } },
        { new: true },
      );

      if (!updated) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(updated);
    }

    const task = await taskModel.findOne({ _id: id, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
