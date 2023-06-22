import jwt from "jsonwebtoken";
import UserHandler from "../handlers/UserHandler.js";

const requireAuth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Authorization token required." });
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserHandler.getUserById(id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found. Please log in again." });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid token. Please log in again.",
    });
  }
};

export default requireAuth;
