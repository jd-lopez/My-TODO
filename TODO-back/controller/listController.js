const boardModel = require("../model/boardModel");
const listModel = require("../model/listModel");
const getUserId = require("../utils/getUser");

exports.createList = async (req, res) => {
  try {
    const userId = getUserId(req);
    const title = req.body.title;
    const { id } = req.params;
    console.log(title);

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const newList = new listModel({ user: userId, title, board: id });
    const saved = await newList.save();

    return res.status(200).json(saved);
  } catch (error) {
    return res.status(500).json({ message: "Error creating list" });
  }
};

exports.getAllList = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const lists = await listModel.find({ user: userId, board: id });

    return res.status(200).json(lists);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching lists" });
  }
};
