import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const Invoice = sequelize.define(
    'Invoice',
    {
        accountId: {
            type: DataTypes.INTEGER,
        },
        totalAmount: {
            type: DataTypes.DECIMAL,
        },
        discount: {
            type: DataTypes.DECIMAL,
        },
        paymentStatus: {
            type: DataTypes.STRING,
        },
    },
    {
        tableName: 'Invoices',
        paranoid: true,
    },
);

export default Invoice