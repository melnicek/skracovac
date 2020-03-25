const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema({
  urlCode: String,
  date: { type: String, default: Date.now},
  ip: String,
  userAgent: String,
  city: String,
  country: String
});

module.exports = mongoose.model("Click", clickSchema);