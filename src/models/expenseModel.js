const mongoose = require("mongoose");
const User = require("./userModel");
const Group = require("./groupModel");

//defining Schema
const expenseSchema = mongoose.Schema({
  groupId: {
    type: mongoose.Schema.ObjectId,
    ref: Group,
  },
  from: {
    type: String,
    ref: "User",
  },
  to: {
    type: String,
    ref: "User",
  },
  amount: {
    type: Number,
    default: 0,
  },
});

//exporting schema
module.exports = mongoose.model("Expense", expenseSchema);
