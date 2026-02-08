const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("todo", taskSchema);
