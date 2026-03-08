const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModer");

function signToken(userID) {
  // Keep token payload and expiration consistent between register and login.
  return jwt.sign({ userID }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function normalizeNameInput({ first, last }) {
  return {
    first: typeof first === "string" ? first.trim() : "",
    last: typeof last === "string" ? last.trim() : "",
  };
}

exports.register = async (req, res) => {
  try {
    const { first, last, email, password } = req.body;
    const normalizedName = normalizeNameInput({ first, last });

    if (!normalizedName.first || !normalizedName.last || !email || !password) {
      return res
        .status(400)
        .json({ message: "First name, last name, email and password are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: normalizedName,
      email,
      password: hashedPassword,
    });

    const token = signToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: {
          first: user.name.first || "",
          last: user.name.last || "",
        },
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: {
          first: user.name.first || "",
          last: user.name.last || "",
        },
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
