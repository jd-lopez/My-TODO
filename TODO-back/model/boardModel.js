const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
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
