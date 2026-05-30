const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    list: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
      required: false,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: false,
    },
    actionType: {
      type: String,
      enum: ["created", "updated", "deleted", "moved"],
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Activity", activitySchema);
