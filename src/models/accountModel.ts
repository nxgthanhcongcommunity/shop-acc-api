import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Account = sequelize.define(
    'Account',
    {
        idAtProvider: {
            type: DataTypes.STRING,
        },
        familyName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        givenName: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isVerifyEmail: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        photo: {
            type: DataTypes.STRING,
        },
        providerName: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'Accounts',
        paranoid: true,
    },
);

export default Account