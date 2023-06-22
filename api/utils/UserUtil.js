import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// for validation of user data

class UserUtil {
  static generateToken(id, role) {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  }

  static async validateRegisterationPayload({
    email,
    password,
    role,
    adminKey,
  }) {
    if (!email || !password || !role) {
      throw {
        status: 400,
        message: "Please enter all required fields.",
      };
    }

    if (role === "admin" && adminKey !== process.env.ADMIN_KEY) {
      throw {
        status: 400,
        message: "Invalid admin key.",
      };
    }
  }

  static async validateLoginPayload({ email, password }) {
    if (!email || !password) {
      throw {
        status: 400,
        message: "Please enter all required fields.",
      };
    }
  }
}

export default UserUtil;
