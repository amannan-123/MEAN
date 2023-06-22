import User from "../models/user.js";

// for database operations
class UserHandler {
  static async registerUser({ email, password, role }) {
    const newUser = new User({
      email,
      password,
      role,
    });

    return await newUser.save();
  }

  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  static async getUserById(id) {
    return await User.findOne({ _id: id });
  }
}

export default UserHandler;
