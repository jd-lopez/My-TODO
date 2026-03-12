const boardModel = require("../model/boardModel");

exports.createBoard = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user?.id || req.userId?.id || req.userID?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newBoard = new boardModel({ title, owner: userId });

    const saved = await newBoard.save();

    return res.status(201).json(saved);
  } catch (error) {
    throw new Error("Error creating board: " + error.message);
  }
};

exports.getBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id || req.userId?.id || req.userID?.id;

    if (!userId) {
      return res.status(401).json({ message: "No user" });
    }

    const board = await boardModel.findOne({ _id: id, owner: userId });

    return res.status(200).json(board);
  } catch (e) {
    return res.status(500).json({ message: "Server down" });
  }
};
