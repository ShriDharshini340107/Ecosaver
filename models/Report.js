const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  desc: { type: String },
  address: { type: String, required: true },
  image: {
    name: String,
    type: String,
    uri: String,
  },
  datetime: { type: String },
  coords: { type: String },
  category: { type: String },
});

module.exports = mongoose.model('Report', reportSchema);
