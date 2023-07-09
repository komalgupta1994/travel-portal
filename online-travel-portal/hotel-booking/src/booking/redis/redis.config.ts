export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: (process.env.REDIS_PORT || 6379) as number
};

export const keyExpirationTime = 600;