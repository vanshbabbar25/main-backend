const mongoose = require('mongoose');

const connectToMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/GradFlow");
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Could not connect to MongoDB:', err);
  }
};

module.exports = connectToMongo;