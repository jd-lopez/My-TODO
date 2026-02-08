const taskModel = require("../model/taskModel");

//create the task record

exports.createTask = async (req, res) => {
  try {
    const { text } = req.body;

    const lastTask = await taskModel.findOne().sort({ order: -1 });
    const nextOrder = lastTask ? lastTask.order + 1 : 0;

    const newTask = new taskModel({ text, order: nextOrder });
    const saved = await newTask.save();

    res.status(201).json(saved);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel.find().sort({ order: 1 });
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await taskModel.findByIdAndDelete(id);
    res.status(200).json(deleted._id);
  } catch (error) {
    console.log(error);
  }
};

exports.markComplete = async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (err) {}
};
