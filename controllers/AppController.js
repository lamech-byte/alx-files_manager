import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // Endpoint to check the status of Redis and the DB
  static getStatus(req, res) {
    const redisStatus = redisClient.isAlive();
    const dbStatus = dbClient.isAlive();

    res.status(200).send({ redis: redisStatus, db: dbStatus });
  }

  // Endpoint to get the number of users and files in DB
  static async getStats(req, res) {
    const users = await dbClient.nbUsers();
    const files = await dbClient.nbFiles();

    res.status(200).send({ users, files });
  }
}

export default AppController;
