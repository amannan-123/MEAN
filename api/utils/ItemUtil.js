class ItemUtil {
  static async validateItem({ name, price }) {
    if (!name || price < 1) {
      throw {
        status: 400,
        message: "Please enter all required fields.",
      };
    }
  }

  static async validateUser(item, user) {
    if (item.userId != user.id && user.role != "admin") {
      throw {
        status: 401,
        message: "You don't have permission to perform this action.",
      };
    }
  }

  static validateFilters({ sort, order }) {
    if (!sort) {
      sort = "createdAt";
    } else {
      if (
        sort !== "name" &&
        sort !== "price" &&
        sort !== "createdAt" &&
        sort !== "updatedAt"
      )
        sort = "createdAt";
    }

    if (!order) {
      order = -1;
    } else {
      order = order.toLowerCase() === "desc" ? -1 : 1;
    }

    let sortCriteria = {};

    if (sort === "name") {
      sortCriteria.name = order;
    } else if (sort === "price") {
      sortCriteria.price = order;
    } else if (sort === "createdAt") {
      sortCriteria.createdAt = order;
    } else if (sort === "updatedAt") {
      sortCriteria.updatedAt = order;
    }

    return sortCriteria;
  }
}

export default ItemUtil;
