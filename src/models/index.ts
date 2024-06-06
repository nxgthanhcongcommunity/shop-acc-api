import AccountModel from "./accountModel"
import CategoryModel from "./categoryModel"
import ProductModel from "./productModel"
import KeypairModel from "./keypairModel"
import BalanceModel from "./balanceModel"
import TransactionModel from "./transactionModel"
import InvoiceModel from "./invoiceModel"
import InvoiceDetailModel from "./invoiceDetailModel"
import QuantityModel from "./quantityModel"
import SendMailModel from "./sendMailModel"

import { Sequelize } from "sequelize-typescript";
import "dotenv/config";

const { RESET_DATABASE } = process.env;

export const sequelize = new Sequelize("shop-acc", "postgres", "qqq111!!!", {
    host: "localhost",
    // host: "10.253.2.18",
    port: 5432,
    dialect: "postgres",
    logging: false,
});

sequelize.addModels([ProductModel, QuantityModel, CategoryModel, AccountModel, BalanceModel, SendMailModel]);

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    if (RESET_DATABASE === "true") {
        await sequelize.sync();
        // await sequelize.sync({ alter: true });
        // await sequelize.sync({ force: true });
        console.log("All models were synchronized successfully.");
    }
})();


export {
    AccountModel,
    CategoryModel,
    ProductModel,
    KeypairModel,
    BalanceModel,
    TransactionModel,
    InvoiceModel,
    InvoiceDetailModel,
    QuantityModel,
    SendMailModel,
}