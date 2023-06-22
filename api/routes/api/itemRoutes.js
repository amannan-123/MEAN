import express from "express";
import ItemController from "../../controllers/ItemController.js";

const router = express.Router();
// Get all items
router.get("/", ItemController.getAll);

// Get one item
router.get("/:id", ItemController.getOne);

// Update an item
router.patch("/:id", ItemController.update);

// Add a new item
router.post("/", ItemController.create);

// Delete an item
router.delete("/:id", ItemController.delete);

export default router;
