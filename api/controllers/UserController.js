import UserService from "../services/UserService.js";

// for request and response redirection
class UserController {
  static async registerUser(req, res) {
    try {
      const result = await UserService.registerUser(req.body);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async loginUser(req, res) {
    try {
      const result = await UserService.loginUser(req.body);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async validateToken(req, res) {
    try {
      const result = await UserService.validateToken(req.user);
      res.json(result);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default UserController;
