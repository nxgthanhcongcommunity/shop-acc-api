import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Banner = sequelize.define(
    'Banner',
    {
        name: {
            type: DataTypes.STRING,
        },
        code: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'Banners',
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['code']
        }]
    },
);

export default Banner