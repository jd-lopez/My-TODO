const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskController = require("./controller/taskController");
const authController = require("./controller/authController");
const authMiddleware = require("./middleware/auth");

mongoose
  .connect(process.env.MONGO_URI)
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

app.get("/tasks", authMiddleware, taskController.getAllTasks);
app.post("/tasks", authMiddleware, taskController.createTask);
app.delete("/tasks/:id", authMiddleware, taskController.deleteTask);
app.patch("/tasks/:id", authMiddleware, taskController.markComplete);

app.post("/login", authController.login);
app.post("/register", authController.register);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
