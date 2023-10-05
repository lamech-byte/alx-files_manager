/*
 * Create a Redis client and export it.
 */

import { createClient } from 'redis';

const { promisify } = require('util');

class RedisClient {
  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (error) => {
      console.error('Redis Client Error:', error);
    });
  }

  /**
   * Check if the Redis client is alive and connected.
   * @returns {boolean} true if connected, false otherwise.
   */
  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    return this.getAsync(key);
  }

  /**
   * Set a Redis key-value pair with an expiration duration (in seconds).
   * @param {string} key - The Redis key to set.
   * @param {string} value - The value to set for the key.
   * @param {number} duration - The expiration duration in seconds.
   */
  async set(key, value, duration) {
    this.client.set(key, value, 'EX', duration);
  }

  /**
   * Delete a Redis key.
   * @param {string} key - The Redis key to delete.
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
