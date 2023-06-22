import ItemHandler from "../handlers/ItemHandler.js";
import ItemUtil from "../utils/ItemUtil.js";

class ItemService {
  static async createItem({ name, price }, user) {
    try {
      await ItemUtil.validateItem({ name, price });
      const userId = user.id;
      const result = await ItemHandler.createItem({ name, price, userId });
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateItem(itemId, { name, price }, user) {
    try {
      await ItemUtil.validateItem({ name, price });

      const item = await ItemHandler.getOneItem(itemId);

      if (!item) {
        throw {
          status: 404,
          message: `Item with id '${itemId}' doesn't exist.`,
        };
      } else {
        await ItemUtil.validateUser(item, user);
        item.name = name;
        item.price = price;
        const updatedItem = ItemHandler.updateItem(item);
        return updatedItem;
      }
    } catch (error) {
      throw error;
    }
  }

  static async deleteItem(itemId, user) {
    try {
      const item = await ItemHandler.getOneItem(itemId);

      if (!item) {
        throw {
          status: 404,
          message: `Item with id '${itemId}' doesn't exist.`,
        };
      } else {
        await ItemUtil.validateUser(item, user);
        await ItemHandler.deleteItem(item);
      }
    } catch (error) {
      throw error;
    }
  }

  static async getOneItem(itemId, user) {
    try {
      const item = await ItemHandler.getOneItem(itemId);

      if (!item) {
        throw {
          status: 404,
          message: `Item with id '${itemId}' doesn't exist.`,
        };
      } else {
        await ItemUtil.validateUser(item, user);
        return item;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getAllItems({ search, sort, order }, user) {
    try {
      const nameRegex = new RegExp(search, "i");

      const filter = {
        name: nameRegex,
        ...(user.role === "user" && { userId: user.id }),
      };

      const sortCriteria = ItemUtil.validateFilters({ sort, order });

      const items = await ItemHandler.getAllItems(filter, sortCriteria);
      return items;
    } catch (error) {
      throw error;
    }
  }
}

export default ItemService;
