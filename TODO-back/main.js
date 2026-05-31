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
const activityController = require("./controller/activityController");
const authMiddleware = require("./middleware/auth");

// Required environment variables used for database connection, JWT signing, and CORS configuration.
const requiredEnvVars = ["MONGO_URL", "JWT_SECRET", "CLIENT_URL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`,
  );
}

const app = express();

// Apply security headers to make the API safer for browser clients.
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

// CORS configuration to allow authorized client origins.
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

// Parse URL-encoded data from HTML forms.
app.use(
  express.urlencoded({
    extended: false,
  }),
);

// Parse JSON bodies for API requests.
app.use(express.json({ limit: "10kb" }));

// Get all boards created by the authenticated user.
app.get("/boards", authMiddleware, boardController.getAllBoards);

// Get all boards shared with the authenticated user.
app.get("/boards/shared", authMiddleware, boardController.getSharedBoards);

// Create a new board owned by the authenticated user.
app.post("/boards", authMiddleware, boardController.createBoard);

// Share a board with another user by email.
app.post(
  "/boards/:boardId/members",
  authMiddleware,
  boardController.shareBoard,
);

// Leave a shared board as the authenticated user.
app.post("/boards/:boardId/leave", authMiddleware, boardController.leaveBoard);

// Get a single board if the authenticated user is owner or member.
app.get("/boards/:boardId", authMiddleware, boardController.getBoard);

// Create a new list inside a board.
app.post("/boards/:boardId/lists", authMiddleware, listController.createList);

// Get all lists for a board.
app.get("/boards/:boardId/lists", authMiddleware, listController.getAllList);

// Create a task in a specific list.
app.post(
  "/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  taskController.createTask,
);

// Get all tasks for a specific list.
app.get(
  "/boards/:boardId/lists/:listId/tasks",
  authMiddleware,
  taskController.getAllTasks,
);

// Get activity logs for a specific task.
app.get(
  "/boards/:boardId/lists/:listId/tasks/:taskId/activity",
  authMiddleware,
  activityController.getActivityLogs,
);

// Delete a board owned by the authenticated user.
app.delete("/boards/:boardId", authMiddleware, boardController.deleteBoard);

// Delete a task from a list.
app.delete(
  "/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  taskController.deleteTask,
);

// Delete a list from a board.
app.delete(
  "/boards/:boardId/lists/:listId",
  authMiddleware,
  listController.deleteList,
);

// Update a task's title, description, or completion state.
app.patch(
  "/boards/:boardId/lists/:listId/tasks/:taskId",
  authMiddleware,
  taskController.updateTask,
);

// Authentication routes for login and registration.
app.post("/login", authLimiter, authController.login);
app.post("/register", authLimiter, authController.register);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected");
    // Start the HTTP server only after MongoDB is available.
    app.listen(PORT, () => console.log(`API running on ${PORT}`));
  })
  .catch((err) => {
    console.error("Database connection error:", err);
    process.exit(1);
  });
