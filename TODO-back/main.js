const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskController = require("./controller/taskController");

mongoose
  .connect("mongodb://localhost:27017/todoReact")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`Database connection error: ${err}`);
  });

const app = express();

app.use(cors());
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());

app.get("/tasks", taskController.getAllTasks);
app.post("/tasks", taskController.createTask);
app.delete("/tasks/:id", taskController.deleteTask);
app.patch("/tasks/:id", taskController.markComplete);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
