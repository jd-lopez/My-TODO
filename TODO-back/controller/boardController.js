const boardModel = require("../model/boardModel");
const getUserId = require("../utils/getUser");

exports.createBoard = async (req, res) => {
  try {
    const { title, background } = req.body;
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newBoard = new boardModel({ title, owner: userId, background });

    const saved = await newBoard.save();

    return res.status(201).json(saved);
  } catch (error) {
    throw new Error("Error creating board: " + error.message);
  }
};

exports.getAllBoards = async (req, res) => {
  try {
    const userId = req.user?.id || req.userId?.id || req.userID?.id;

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
    const userId = req.user?.id || req.userId?.id || req.userID?.id;

    if (!userId) {
      return res.status(401).json({ message: "No user" });
    }

    const board = await boardModel.findOne({
      _id: boardId,
      owner: userId,
    });

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: "Server down" });
  }
};
