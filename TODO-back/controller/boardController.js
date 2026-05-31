const boardModel = require("../model/boardModel");
const userModel = require("../model/userModel");
const getUserId = require("../utils/getUser");
const listModel = require("../model/listModel");
const taskModel = require("../model/taskModel");

// Board controller functions handle creation, sharing, retrieval, and board membership.
exports.createBoard = async (req, res) => {
  try {
    const { title, background } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Lookup the current user so we can assign the owner member entry.
    const user = await userModel.findById(userId);

    const newBoard = new boardModel({
      title,
      owner: userId,
      background,
      members: [{ user: userId, role: "owner", color: user.color }],
    });

    const saved = await newBoard.save();

    return res.status(201).json(saved);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Return boards owned by the authenticated user.
exports.getAllBoards = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const boards = await boardModel.find({
      owner: userId,
    });

    return res.status(200).json(boards);
  } catch (err) {
    return res.status(500).json({ message: "Server down" });
  }
};

//get shared boards

// Return boards shared with the authenticated user as a member.
exports.getSharedBoards = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const boards = await boardModel.find({
      members: { $elemMatch: { user: userId, role: "member" } },
    });

    return res.status(200).json(boards);
  } catch (err) {
    return res.status(500).json({ message: "Server down" });
  }
};

// Return a single board if the authenticated user owns it or is a member.
exports.getBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "No user" });
    }

    const board = await boardModel
      .findOne({
        _id: boardId,
        $or: [{ owner: userId }, { "members.user": userId }],
      })
      .populate("members.user", "name email color");

    if (!board) {
      return res
        .status(404)
        .json({ message: "Board not found or access denied" });
    }

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: "Server down" });
  }
};

// Share a board by adding a new member entry with the requested role.
// Share a board by adding a new member with the specified role.
exports.shareBoard = async (req, res) => {
  const { boardId } = req.params;
  const userId = getUserId(req);

  const { email, role } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const board = await boardModel.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Only the owner is allowed to invite new members.
    if (String(board.owner) !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const userToShare = await userModel.findOne({ email: email });

    if (!userToShare) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyMember = board.members.some(
      (member) => String(member.user) === String(userToShare._id),
    );

    if (alreadyMember) {
      return res.status(409).json({ message: "User is already a member" });
    }

    const addedMember = {
      user: userToShare._id,
      role,
      color: userToShare.color,
    };

    board.members.push(addedMember);
    await board.save();

    const updatedBoard = await boardModel
      .findById(boardId)
      .populate("members.user", "name email color");

    return res.status(200).json(updatedBoard);
  } catch (error) {
    return res.status(500).json({ message: "Server down" });
  }
};

// Delete a board and all its associated lists and tasks.
exports.deleteBoard = async (req, res) => {
  const { boardId } = req.params;
  const userId = getUserId(req);

  try {
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const board = await boardModel.findById({ _id: boardId });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (String(board.owner) !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Remove the board and cleanup child data to keep the database consistent.
    await boardModel.findByIdAndDelete(boardId);
    await listModel.deleteMany({ board: boardId });
    await taskModel.deleteMany({ board: boardId });

    return res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server down" });
  }
};

// Remove the authenticated user from a shared board's member list.
exports.leaveBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const board = await boardModel.findById(boardId);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (String(board.owner) === userId) {
      return res
        .status(403)
        .json({ message: "Owners cannot leave their own board" });
    }

    board.members = board.members.filter(
      (member) => String(member.user) !== userId,
    );

    await board.save();

    return res.status(200).json({ message: "Left the board successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server down" });
  }
};
