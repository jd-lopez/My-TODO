const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskController = require("./controller/taskController");
const authController = require("./controller/authController");
const authMiddleware = require("./middleware/auth");

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);
app.use(
  express.urlencoded({
    extended: false,
  }),
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("API is running");
});
app.get("/tasks", authMiddleware, taskController.getAllTasks);
app.post("/tasks", authMiddleware, taskController.createTask);
app.delete("/tasks/:id", authMiddleware, taskController.deleteTask);
app.patch("/tasks/:id", authMiddleware, taskController.markComplete);

app.post("/login", authController.login);
app.post("/register", authController.register);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`API running on ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
