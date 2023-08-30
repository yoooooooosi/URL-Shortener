const mongoose = require('mongoose') //載入mongoose套件
const Schema = mongoose.Schema

const urlSchema = new Schema({
  OriginRrl: {
    type: String,
    required: true,
  },
  NewRrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Url", urlSchema);