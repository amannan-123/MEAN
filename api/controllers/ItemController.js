import ItemService from "../services/ItemService.js";

class ItemController {
  static async create(req, res) {
    try {
      const newItem = await ItemService.createItem(req.body, req.user);
      res.json(newItem);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const newItem = await ItemService.updateItem(
        req.params.id,
        req.body,
        req.user
      );
      res.json(newItem);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      await ItemService.deleteItem(req.params.id, req.user);
      res.json({ success: true });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const { search, sort, order } = req.query;
      const items = await ItemService.getAllItems(
        { search, sort, order },
        req.user
      );
      res.json(items);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  static async getOne(req, res) {
    try {
      const item = await ItemService.getOneItem(req.params.id, req.user);
      res.json(item);
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }
}

export default ItemController;
