import { Sequelize } from "sequelize";
import 'dotenv/config';

export const sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USERNAME,
    process.env.POSTGRES_PASSWORD,
    {
        host: process.env.POSTGRES_HOST,
        dialect: 'postgres',
    }
);

const Redis = require('ioredis');
const redis = new Redis({
  host: process.env.REDIS_HOST, // Endereço do servidor Redis
  port: process.env.REDIS_PORT,        // Porta padrão do Redis
  db: process.env.REDIS_DB         // Banco de dados padrão do Redis
});

module.exports = redis;
