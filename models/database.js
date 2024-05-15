const mongoose = require('mongoose');

exports.connectDB = async (req, res) => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/internshala', {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err.message);
  }
};
