const taskModel = require("../model/taskModel");
const getUserId = require("../utils/getUser");
// function getUserId(req) {
//   // Keep compatibility with the older request field names used earlier in the project.
//   return req.user?.id || req.userId?.id || req.userID?.id;
// }

exports.createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = getUserId(req);
    const { boardId, listId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const lastTask = await taskModel
      .findOne({ user: userId, board: boardId, list: listId })
      .sort({ order: -1 });
    const nextOrder = lastTask ? lastTask.order + 1 : 0;

    const newTask = new taskModel({
      user: userId,
      board: boardId,
      list: listId,
      title,
      order: nextOrder,
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
    const { boardId, listId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tasks = await taskModel
      .find({ user: userId, board: boardId, list: listId })
      .sort({ order: 1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { boardId, listId, taskId } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deleted = await taskModel.findOneAndDelete({
      board: boardId,
      _id: taskId,
      list: listId,
      user: userId,
    });

    console.log(deleted);

    if (!deleted) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ taskId: deleted._id });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// exports.markComplete = async (req, res) => {
//   try {
//     const userId = getUserId(req);
//     const { boardId, listId, taskId } = req.params;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const task = await taskModel.findOne({
//       board: boardId,
//       list: listId,
//       _id: taskId,
//       user: userId,
//     });
//     if (!task) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     task.completed = !task.completed;
//     await task.save();
//     return res.status(200).json(task);
//   } catch (err) {
//     return res.status(500).json({ message: "Server error" });
//   }
// };

exports.updateTask = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { boardId, listId, taskId } = req.params;
    const { completed, description, title } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updates = {};
    if (typeof completed === "boolean") updates.completed = completed;
    if (typeof description === "string") updates.description = description;
    if (typeof title === "string") updates.title = title;

    const updatedTask = await taskModel.findOneAndUpdate(
      {
        board: boardId,
        list: listId,
        _id: taskId,
        user: userId,
      },
      {
        $set: updates,
      },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};
