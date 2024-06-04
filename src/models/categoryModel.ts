import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
    bannerCode: {
      type: DataTypes.STRING,
    },
    mainFileUrl: {
      type: DataTypes.STRING,
    },
    mainFileCLDId: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Categories",
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["code"],
      },
    ],
  }
);

export default Category;
