const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const taskController = require("./controller/taskController");
const authController = require("./controller/authController");
const boardController = require("./controller/boardController");
const listController = require("./controller/listController");
const authMiddleware = require("./middleware/auth");

const requiredEnvVars = ["MONGO_URL", "JWT_SECRET", "CLIENT_URL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

const app = express();

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  }),
);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

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
app.use(express.json({ limit: "10kb" }));

app.get("/boards", authMiddleware, boardController.getAllBoards);
app.post("/boards", authMiddleware, boardController.createBoard);
app.post(
  "/boards/:boardId/members",
  authMiddleware,
  boardController.shareBoard,
);
app.get("/boards/:boardId", authMiddleware, boardController.getBoard);

app.post("/boards/:boardId/lists", authMiddleware, listController.createList);

app.get("/boards/:boardId/lists", authMiddleware, listController.getAllList);
app.post(
  "/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  taskController.createTask,
);

app.get(
  "/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  taskController.getAllTasks,
);

app.delete("/boards/:boardId", authMiddleware, boardController.deleteBoard);
app.delete(
  "/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  taskController.deleteTask,
);
app.delete(
  "/boards/:boardId/lists/:listId",
  authMiddleware,
  listController.deleteList,
);

app.patch(
  "/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  taskController.updateTask,
);

app.post("/login", authLimiter, authController.login);
app.post("/register", authLimiter, authController.register);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
    // The API only starts after MongoDB connects, so requests never hit a half-started server.
    app.listen(PORT, () => console.log(`API running on ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
