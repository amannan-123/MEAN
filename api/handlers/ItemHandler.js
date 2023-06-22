import Item from "../models/item.js";

class ItemHandler {
  static async createItem({ name, price, userId }) {
    try {
      const newItem = new Item({ name, price, userId });
      const savedItem = await newItem.save();
      return savedItem;
    } catch (err) {
      throw err;
    }
  }

  static async updateItem(item) {
    try {
      return await item.save();
    } catch (error) {
      throw error;
    }
  }

  static async getAllItems(filter, sortCriteria) {
    try {
      return await Item.find(filter).sort(sortCriteria);
    } catch (error) {
      throw error;
    }
  }

  static async getOneItem(id) {
    try {
      const item = await Item.findOne({
        _id: id,
      });
      return item;
    } catch (error) {
      throw error;
    }
  }

  static async deleteItem(item) {
    try {
      await item.deleteOne();
    } catch (error) {
      throw error;
    }
  }
}

export default ItemHandler;
