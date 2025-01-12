import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const host = process.env.REDIS_HOST!;
const port = process.env.REDIS_PORT!;

const redis = new Redis(Number(port), host);

export default redis;
