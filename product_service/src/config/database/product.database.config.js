import dotenv from 'dotenv';

dotenv.config();

export const config = {
    user: process.env.DATABASE_USER_NAME,
    password:process.env.DATABASE_PASSWORD,
    host:process.env.DATABASE_HOST,
    database:process.env.DATABASE_NAME,
    port:process.env.DATABASE_PORT,
    query_timeout: 400,
    application_name: 'product_service',
    connectionTimeoutMillis:500,
    max:14
};