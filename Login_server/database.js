

const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb+srv://iamthechakri:mRt7qoP6fTmGOG5E@mymongodb.ziepkjw.mongodb.net/users-database?retryWrites=true&w=majority'; 

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
