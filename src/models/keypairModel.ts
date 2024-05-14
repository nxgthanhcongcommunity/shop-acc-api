import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Keypair = sequelize.define(
    'Keypair',
    {
        key: {
            type: DataTypes.STRING,
        },
        value: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'Keypairs',
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['key']
        }]
    },
);

export default Keypair