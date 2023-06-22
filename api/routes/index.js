import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import users from "./api/userRoutes.js";
import items from "./api/itemRoutes.js";

const router = express.Router();

const USER_PREFIXES = "/api/users";
const ITEM_PREFIXES = "/api/items";

router.use(USER_PREFIXES, users);
router.use(ITEM_PREFIXES, requireAuth, items);

router.use("/", (req, res) => {
  res.send("API is running");
});

export default router;
