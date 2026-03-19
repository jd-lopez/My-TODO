const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

module.exports = async function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userID);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    // Normalize the authenticated user onto req.user so controllers only read one field.
    req.user = { id: user._id.toString() };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
