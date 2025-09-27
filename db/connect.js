const { MongoClient } = require('mongodb');
require('dotenv').config();

let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log("Database is already initialized");
    return callback(null, _db);
  }
  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    _db = client.db();
    console.log("Connected to MongoDB");
    callback(null, _db);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};

module.exports = { initDb, getDb };
