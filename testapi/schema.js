const mongoose = require("mongoose");

const uniqueLeakSchema = mongoose.Schema({
  domain: {type: String},
  data: [{}]
});

module.exports = mongoose.model("uniqueLeaks", uniqueLeakSchema, "uniqueLeaks")