import { Sequelize } from 'sequelize';
import 'dotenv/config';

const { RESET_DATABASE } = process.env;

export const sequelize = new Sequelize('shop-acc', 'postgres', 'qqq111!!!', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    console.log("RESET_DATABASE: ", RESET_DATABASE)

    if (RESET_DATABASE === 'true') {
        await sequelize.sync({ alter: true });
        // await sequelize.sync();
        console.log('All models were synchronized successfully.');
    }
})()