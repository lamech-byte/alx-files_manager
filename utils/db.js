import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    // MongoDB connection parameters
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    // MongoDB connection URL
    const url = `mongodb://${host}:${port}/${database}`;

    // Create a new MongoClient instance
    this.client = new MongoClient(url, { useUnifiedTopology: true });

    // Connect to MongoDB
    this.client.connect()
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((error) => {
        console.error('MongoDB Connection Error:', error);
      });
  }

  // Check if the connection to MongoDB is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Get the number of documents in the "users" collection
  async nbUsers() {
    const usersCollection = this.client.db().collection('users');
    return usersCollection.countDocuments();
  }

  // Get the number of documents in the "files" collection
  async nbFiles() {
    const filesCollection = this.client.db().collection('files');
    return filesCollection.countDocuments();
  }
}

// Export an instance of the DBClient class
export default new DBClient();
