const taskModel = require("../model/taskModel");
const boardModel = require("../model/boardModel");
const activityModel = require("../model/activityModel");
const getUserId = require("../utils/getUser");
// Task controller handles task creation, retrieval, update, and deletion.
// Activity log entries are created when tasks are created or updated.

// Create a new task in a board list and log the creation event.
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

    // Verify the user has access to this board (owner or member)
    const board = await boardModel.findOne({
      _id: boardId,
      $or: [{ owner: userId }, { "members.user": userId }],
    });

    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or access denied" });
    }

    // Find the last task for this list (regardless of creator)
    // Determine the next display order within the list.
    const lastTask = await taskModel
      .findOne({ board: boardId, list: listId })
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

    await activityModel.create({
      user: userId,
      board: boardId,
      list: listId,
      task: saved._id,
      actionType: "created",
      description: `Created task "${title}"`,
    });

    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for a specific list; used by the board UI to load list contents.
exports.getAllTasks = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { boardId, listId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the user has access to this board (owner or member)
    const board = await boardModel.findOne({
      _id: boardId,
      $or: [{ owner: userId }, { "members.user": userId }],
    });

    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or access denied" });
    }

    // Return ALL tasks for this list (not filtered by user)
    const tasks = await taskModel
      .find({ board: boardId, list: listId })
      .sort({ order: 1 });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a specific task if the authenticated user has board access.
exports.deleteTask = async (req, res) => {
  try {
    const { boardId, listId, taskId } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the user has access to this board (owner or member)
    const board = await boardModel.findOne({
      _id: boardId,
      $or: [{ owner: userId }, { "members.user": userId }],
    });

    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or access denied" });
    }

    // Delete the task (not filtered by user - any board member can delete)
    const deleted = await taskModel.findOneAndDelete({
      board: boardId,
      _id: taskId,
      list: listId,
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

// Update task fields and record an activity entry for the update.
exports.updateTask = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { boardId, listId, taskId } = req.params;
    const { completed, description, title } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify the user has access to this board (owner or member)
    const board = await boardModel.findOne({
      _id: boardId,
      $or: [{ owner: userId }, { "members.user": userId }],
    });

    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or access denied" });
    }

    const updates = {};
    const updateDescriptions = [];
    if (typeof completed === "boolean") {
      updates.completed = completed;
      updateDescriptions.push(
        `marked task ${completed ? "complete" : "incomplete"}`,
      );
    }
    if (typeof description === "string") {
      updates.description = description;
      updateDescriptions.push("updated the description");
    } else if (description === "") {
      return res.status(400).json({ message: "Description cannot be empty" });
    }
    if (typeof title === "string") {
      updates.title = title;
      updateDescriptions.push("updated the title");
    }

    // Update the task (not filtered by user - any board member can update)
    const updatedTask = await taskModel.findOneAndUpdate(
      {
        board: boardId,
        list: listId,
        _id: taskId,
      },
      {
        $set: updates,
      },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (updateDescriptions.length > 0) {
      // Record precisely what changed about the task.
      await activityModel.create({
        user: userId,
        board: boardId,
        list: listId,
        task: taskId,
        actionType: "updated",
        description: `Updated task "${updatedTask.title}" (${updateDescriptions.join(", ")})`,
      });
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
