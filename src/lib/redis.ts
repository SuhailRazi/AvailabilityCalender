// lib/redis.ts
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT), // Typically 6379 for Redis
  password: process.env.REDIS_PASSWORD,
  tls: { rejectUnauthorized: false }, // Use this if your Upstash Redis instance uses TLS
});

export default redis;
