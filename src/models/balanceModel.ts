import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Balance = sequelize.define(
  "Balance",
  {
    accountId: {
      type: DataTypes.INTEGER,
    },
    amount: {
      type: DataTypes.DECIMAL,
    }
  },
  {
    tableName: "Balances",
    paranoid: true,
  }
);

export default Balance;
