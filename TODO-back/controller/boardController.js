const boardModel = require("../model/boardModel");
const userModel = require("../model/userModel");
const getUserId = require("../utils/getUser");

exports.createBoard = async (req, res) => {
  try {
    const { title, background } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

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
    throw new Error("Error creating board: " + error.message);
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const boards = await boardModel.find({ owner: userId });

    return res.status(200).json(boards);
  } catch (err) {
    return res.status(500).json({ message: "Server down" });
  }
};

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

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: "Server down" });
  }
};

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
