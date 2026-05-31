const boardModel = require("../model/boardModel");
const listModel = require("../model/listModel");
const getUserId = require("../utils/getUser");
const taskModel = require("../model/taskModel");

// List controller functions manage list creation, retrieval, and deletion.

exports.createList = async (req, res) => {
  try {
    const userId = getUserId(req);
    const title = req.body.title;
    const { boardId } = req.params;
    console.log(title);

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const lastList = await listModel
      .findOne({ user: userId, board: boardId })
      .sort({ order: -1 });
    const nextOrder = lastList ? lastList.order + 1 : 0;

    const board = await boardModel.findOne({
      _id: boardId,
      $or: [{ owner: userId }, { "members.user": userId }],
    });
    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or access denied" });
    }

    const newList = new listModel({
      user: userId,
      title,
      board: boardId,
      order: nextOrder,
    });
    const saved = await newList.save();

    return res.status(200).json(saved);
  } catch (error) {
    return res.status(500).json({ message: "Error creating list" });
  }
};

// Return all lists for a board if the user is the owner or a member.
exports.getAllList = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { boardId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
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

    // Return ALL lists for this board (not filtered by user)
    const lists = await listModel.find({ board: boardId });

    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching lists" });
  }
};

// Delete a list and all tasks inside it for an accessible board.
exports.deleteList = async (req, res) => {
  try {
    const { boardId, listId } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
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

    // Delete the list. Any board member can remove it, not just the creator.
    const deletedList = await listModel.findOneAndDelete({
      board: boardId,
      _id: listId,
    });

    if (!deletedList) {
      return res.status(404).json({ message: "list not found" });
    }

    // Delete all tasks in this list so orphan tasks do not remain.
    const deletedTasks = await taskModel.deleteMany({
      board: boardId,
      list: listId,
    });

    return res.status(200).json({ listId: deletedList._id });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching lists" });
  }
};
