import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Transaction = sequelize.define(
  "Transaction",
  {
    transactionIdAtProvider: {
      type: DataTypes.INTEGER,
    },
    gateway: {
      type: DataTypes.STRING,
    },
    transactionDate: {
      type: DataTypes.DATE,
    },
    accountNumber: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    transferType: {
      type: DataTypes.STRING,
    },
    transferAmount: {
      type: DataTypes.DECIMAL,
    },
    accumulated: {
      type: DataTypes.DECIMAL,
    },
    subAccount: {
      type: DataTypes.STRING,
    },
    referenceCode: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    raw: {
      type: DataTypes.TEXT,
    }
  },
  {
    tableName: "Transactions",
    paranoid: true,
  }
);

export default Transaction;
