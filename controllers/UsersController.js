/*
 * Control how we define our users
 */

import sha1 from 'sha1';
import { ObjectId } from 'mongodb';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).send({ error: 'Missing password' });
    }

    const emailExists = await dbClient.users.findOne({ email });

    if (emailExists) {
      return res.status(400).send({ error: 'Already exist' });
    }

    const passwordHashed = sha1(password);

    const user = await dbClient.users.insertOne({ email, password: passwordHashed });

    return res.status(201).send({ id: user.insertedId, email });
  }

  static async getMe(req, res) {
    const token = req.header('X-Token');

    if (!token) {
      return res.status(401).send({ error: 'Unauthorized' });
    }

    try {
      const userId = await redisClient.get(`auth_${token}`);

      if (!userId) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const user = await dbClient.users.findOne({ _id: ObjectId(userId) });

      if (!user) {
        return res.status(401).send({ error: 'Unauthorized' });
      }

      const { _id, email } = user;

      return res.status(200).json({ id: _id, email });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: 'Internal Server Error' });
    }
  }
}

export default UsersController;
