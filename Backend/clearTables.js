const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Table = require('./models/Table');

dotenv.config({ path: path.resolve(__dirname, './.env') });

const MONGO_URI = process.env.MONGO_URI;

const clearTables = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB ✅');

    await Table.deleteMany({});
    console.log('All table documents removed 🚮');

    await mongoose.connection.close();
    console.log('Connection closed ✅');
  } catch (error) {
    console.error('Error deleting tables:', error);
  }
};

clearTables();
