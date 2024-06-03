import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const InvoiceDetail = sequelize.define(
    'InvoiceDetail',
    {
        invoiceId: {
            type: DataTypes.INTEGER,
        },
        productId: {
            type: DataTypes.INTEGER,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
        unitPrice: {
            type: DataTypes.DECIMAL,
        },
        totalPrice: {
            type: DataTypes.DECIMAL,
        },
    },
    {
        tableName: 'InvoiceDetails',
        paranoid: true,
    },
);

export default InvoiceDetail