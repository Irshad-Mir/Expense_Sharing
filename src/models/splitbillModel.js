//Creating Expense Schema
const mongoose = require("mongoose");
const User = require("./userModel");
const Group = require("./groupModel");

//defining Schema
const splitbill = mongoose.Schema({
  gid: {
    type: mongoose.Schema.ObjectId,
    ref: Group,
  },
  expenseType: {
    type: String,
    enum: ["EXACT", "PERCENT", "EQUAL"],
    default: "EQUAL",
  },
  paidBy: {
    type: mongoose.Schema.ObjectId,
    ref: User,
  },
  amount: {
    type: Number,
    require: true,
  },

  sharedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: User,
    },
  ],

  sharingStructure: {},
});

//exporting schema
module.exports = mongoose.model("splitbill", splitbill);
