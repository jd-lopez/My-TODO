const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["todo", "doing", "done"],
    default: "todo",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("todo", taskSchema);
