const Redis = require("ioredis");
const logger = require("./logger");

const redis = new Redis({
  host: process.env.REDIS_HOST,     // Redis Cloud host
  port: process.env.REDIS_PORT,     // Redis Cloud port
  password: process.env.REDIS_PASSWORD, // Redis Cloud password
});

redis.on("connect", () => {
  logger.info("✅ Connected to Redis Cloud successfully");
});

redis.on("error", (err) => {
  logger.info("❌ Redis connection error:", err);
});

module.exports = redis;
