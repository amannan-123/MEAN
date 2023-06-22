import UserHandler from "../handlers/UserHandler.js";
import UserUtil from "../utils/UserUtil.js";
import bcrypt from "bcrypt";

// for business logic

class UserService {
  static async registerUser({ email, password, role, adminKey }) {
    try {
      await UserUtil.validateRegisterationPayload({
        email,
        password,
        role,
        adminKey,
      });

      const userExists = await UserHandler.getUserByEmail(email);

      if (userExists) {
        throw {
          status: 400,
          message: "User with this email already exists.",
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const result = await UserHandler.registerUser({
        email: email,
        password: hashedPassword,
        role: role,
      });

      const token = UserUtil.generateToken(result._id, result.role);

      return { token, email, role };
    } catch (error) {
      throw error;
    }
  }

  static async loginUser({ email, password }) {
    try {
      await UserUtil.validateLoginPayload({ email, password });

      const user = await UserHandler.getUserByEmail(email);

      if (!user) {
        throw {
          status: 400,
          message: "User with this email does not exist.",
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw {
          status: 400,
          message: "Invalid credentials.",
        };
      }

      const token = UserUtil.generateToken(user._id, user.role);

      return { token, email, role: user.role };
    } catch (error) {
      throw error;
    }
  }

  static async validateToken(user) {
    try {
      const result = await UserHandler.getUserById(user._id);
      return { email: result.email, role: result.role };
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
