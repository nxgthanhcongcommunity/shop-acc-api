import * as pg from 'pg'

const { Pool } = pg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'shop-acc',
    password: 'qqq111!!!',
    port: 5432,
});

export const queryFirstOrDefaultAsync = async (text, param = {}) => {
    return (await pool.query(text, param)).rows[0]
}

export const query = async (text) => {
    return await pool.query(text)
}