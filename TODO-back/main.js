const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const taskController = require("./controller/taskController");
const authController = require("./controller/authController");
const boardController = require("./controller/boardController");
const listController = require("./controller/listController");
const authMiddleware = require("./middleware/auth");

const requiredEnvVars = ["MONGO_URI", "JWT_SECRET", "CLIENT_URL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

const app = express();
const configuredOrigins = process.env.CLIENT_URL.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const localOrigins =
  process.env.NODE_ENV !== "production"
    ? [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
      ]
    : [];
const allowedOrigins = new Set([...configuredOrigins, ...localOrigins]);

app.use(
  cors({
    origin(origin, callback) {
      // Allow multiple deployed clients and common local Vite origins without changing code.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
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
app.get("/boards", authMiddleware, boardController.getAllBoards);
app.post("/board", authMiddleware, boardController.createBoard);
app.delete("/tasks/:id", authMiddleware, taskController.deleteTask);
app.patch("/tasks/:id", authMiddleware, taskController.markComplete);
app.get("/board/:id", authMiddleware, boardController.getBoard);
app.post("/board/:id/lists", authMiddleware, listController.createList);
app.get("/board/:id/lists", authMiddleware, listController.getAllList);
app.post(
  "/board/:boardId/lists/:listId/tasks",
  authMiddleware,
  taskController.createTask,
);

app.get(
  "/board/:boardId/lists/:listId/tasks",
  authMiddleware,
  taskController.getAllTasks,
);
app.delete(
  "/board/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  taskController.deleteTask,
);
app.post("/login", authController.login);
app.post("/register", authController.register);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
    // The API only starts after MongoDB connects, so requests never hit a half-started server.
    app.listen(PORT, () => console.log(`API running on ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
