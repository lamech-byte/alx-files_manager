class RedisClient {
  constructor() {
    // Create a new Redis client
    this.client = redis.createClient();

    // Listen for any errors in the Redis client and log them
    this.client.on('error', (error) => {
      console.error(`Redis Client Error: ${error}`);
    });
  }

  // Check if the connection to Redis is alive
  isAlive() {
    return this.client.connected;
  }

  // Get a value from Redis based on a key
  async get(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }

  // Set a key-value pair in Redis with an optional expiration time in seconds
  async set(key, value, durationInSeconds = 0) {
    return new Promise((resolve, reject) => {
      if (durationInSeconds === 0) {
        this.client.set(key, value, (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      } else {
        this.client.setex(key, durationInSeconds, value, (err, reply) => {
          if (err) {
            reject(err);
          } else {
            resolve(reply);
          }
        });
      }
    });
  }

  // Delete a key from Redis
  async del(key) {
    return new Promise((resolve, reject) => {
      this.client.del(key, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          resolve(reply);
        }
      });
    });
  }
}

// Create an instance of the RedisClient class
const redisClient = new RedisClient();

// Export the instance of the RedisClient class
export default redisClient;
