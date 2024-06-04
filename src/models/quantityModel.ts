import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Quantity = sequelize.define(
  "Quantity",
  {
    productId: {
      type: DataTypes.INTEGER,
    },
    currentQuantity: {
      type: DataTypes.DECIMAL,
    },
    soldQuantity: {
      type: DataTypes.DECIMAL,
    },
    comingQuantity: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    tableName: "Quantities",
    paranoid: true,
  }
);

export default Quantity;
