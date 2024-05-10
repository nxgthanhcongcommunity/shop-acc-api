import { sequelize } from "../db";
import { DataTypes } from "sequelize";

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