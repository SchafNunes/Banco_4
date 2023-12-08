const redis = require('../config/index');

function setCache(key, value, expiration) {
  redis.set(key, JSON.stringify(value), 'EX', expiration);
}

async function getCache(key) {
  const data = await redis.get(key);
  if (data) return JSON.parse(data);
  return null;
}

module.exports = { setCache, getCache };
