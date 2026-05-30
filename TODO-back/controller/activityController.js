const activityModel = require("../model/activityModel");
const boardModel = require("../model/boardModel");
const listModel = require("../model/listModel");
const taskModel = require("../model/taskModel");
const getUserId = require("../utils/getUser");

exports.getActivityLogs = async (req, res) => {
  try {
    const userId = getUserId(req);
    const { boardId } = req.params;

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

    const activities = await activityModel
      .find({ board: boardId, task: req.params.taskId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(activities);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
