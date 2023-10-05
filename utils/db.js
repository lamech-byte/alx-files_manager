/*
 * Connect a client to MongoDB
 */

import { MongoClient } from 'mongodb';

const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 27017;
const database = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${host}:${port}`;

class DBClient {
  constructor() {
    // Connect to MongoDB using MongoClient
    MongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
      if (!error) {
        // If the connection is successful, initialize the database and collections
        this.db = client.db(database);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      } else {
        console.error('MongoDB Connection Error:', error.message);
        this.db = false;
      }
    });
  }

  /**
   * Check if the MongoDB client is alive.
   * @returns {boolean} true if connected, false otherwise.
   */
  isAlive() {
    return !!this.db;
  }

  /**
   * Get the number of users in the 'users' collection.
   * @returns {Promise<number>} A Promise that resolves with the number of users.
   */
  async nbUsers() {
    return this.users.countDocuments();
  }

  /**
   * Get the number of files in the 'files' collection.
   * @returns {Promise<number>} A Promise that resolves with the number of files.
   */
  async nbFiles() {
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;
