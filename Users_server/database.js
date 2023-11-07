

const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb://127.0.0.1:27017/users-database'; 

let db; 

const connectToDatabase = async () => {
  if (!db) {
    try {
      const client = new MongoClient(mongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      await client.connect();
      db = client.db(); 
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  }
};

const getDB = () => {
  if (!db) {
    throw new Error('Database is not connected.');
  }
  return db;
};

module.exports = {
  connectToDatabase,
  getDB,
};
