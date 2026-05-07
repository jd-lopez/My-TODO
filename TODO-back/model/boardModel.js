const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: false,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["owner", "admin", "member"],
          required: true,
        },
        color: {
          type: String,
          required: false,
        },
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    background: {
      type: String,
      default: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Board", boardSchema);
