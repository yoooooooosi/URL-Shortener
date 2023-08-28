const mongoose = require('mongoose') //載入mongoose套件
const Schema = mongoose.Schema

const urlSchema = new Schema({
  url : {
    type : String,
    required :true,
  }
})

module.exprts = mongoose.model("Url", urlSchema);