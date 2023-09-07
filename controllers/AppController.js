const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

const AppController = {
  // Endpoint to check the status of Redis and the DB
  getStatus: async (req, res) => {
    const redisStatus = await redisClient.isAlive();
    const dbStatus = await dbClient.isAlive();
    
    return res.status(200).json({
      redis: redisStatus,
      db: dbStatus,
    });
  },

  // Endpoint to get the number of users and files in DB
  getStats: async (req, res) => {
    const numUsers = await dbClient.nbUsers();
    const numFiles = await dbClient.nbFiles();
    
    return res.status(200).json({
      users: numUsers,
      files: numFiles,
    });
  },
};

module.exports = AppController;
