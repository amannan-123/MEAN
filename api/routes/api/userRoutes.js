import express from "express";
import UserController from "../../controllers/UserController.js";
import requireAuth from "../../middlewares/requireAuth.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.get("/validate", requireAuth, UserController.validateToken);

export default router;
