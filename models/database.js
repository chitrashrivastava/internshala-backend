const mongoose = require('mongoose');

exports.connectDB = async (req, res) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/internshala', {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
  }
};
