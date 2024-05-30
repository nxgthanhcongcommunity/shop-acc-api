import { Sequelize } from "sequelize";
import "dotenv/config";

const { RESET_DATABASE } = process.env;

export const sequelize = new Sequelize("shop-acc", "postgres", "password", {
  host: "10.253.2.18",
  port: 5432,
  dialect: "postgres",

  logging: false,
});

(async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  if (RESET_DATABASE === "true") {
    await sequelize.sync({ alter: true });
    // await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  }
})();
