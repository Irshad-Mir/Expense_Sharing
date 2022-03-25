//Creating group Schema
const mongoose = require("mongoose");
const User = require("./userModel");

//defining Schema
const groupSchema = mongoose.Schema({
  gname: {
    type: String,
    required: true,
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
  ],
});
//exporting schema
module.exports = mongoose.model("Group", groupSchema);
