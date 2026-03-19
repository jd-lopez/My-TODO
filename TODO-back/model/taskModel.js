const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: false,
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "List",
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // Each task belongs to one user, which is how dashboard queries stay isolated per account.
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("todo", taskSchema);
