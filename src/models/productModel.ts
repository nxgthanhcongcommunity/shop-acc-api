import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Product = sequelize.define(
    'Product',
    {
        name: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
        },
        server: {
            type: DataTypes.STRING,
        },
        loginType: {
            type: DataTypes.STRING,

        },
        operatingSystem: {
            type: DataTypes.STRING,

        },
        gemChono: {
            type: DataTypes.STRING,
        },
        descriptions: {
            type: DataTypes.STRING,
        },
        categoryCode: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'Products',
        paranoid: true,
    },
);

export default Product