const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, default: "", trim: true },
      last: { type: String, default: "", trim: true },
    },
    email: {
      type: String,
      required: true,
      // Unique + lowercase keeps login lookups and duplicate checks consistent.
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
