import { DataTypes } from "sequelize";
import { sequelize } from "../db";

const Banner = sequelize.define(
    'Banner',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order: {
            type: DataTypes.INTEGER,
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