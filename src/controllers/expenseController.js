const Expense = require("../models/expenseModel");
const Group = require("../models/groupModel");
const User = require("../models/userModel");

const displayExpense = async (req, res) => {
  const currentExpense = await Expense.find({ groupId: req.params.gid }).populate("from").populate("to").exec();

 
  var group = await Group.findById(req.params.gid);
  var groupMembers = group.members;

  var usersFname = [];

  for (id of groupMembers) {
    const userdata = await User.findById(id);
    usersFname.push(userdata.fname);
  }

  var oweDetails = [];

  for (var i = 0; i < usersFname.length; i++) {
    for (var j = 0; j < usersFname.length; j++) {
      if (i == j) continue;
      else {
       
        var totalAmount = 0;
        for (var k = 0; k < currentExpense.length; k++) {
          if (
            currentExpense[k].from.fname == usersFname[i] &&
            currentExpense[k].to.fname == usersFname[j]
          ) {
            totalAmount += currentExpense[k].amount;
          }
        }
        if (totalAmount != 0) {
          const record = `${usersFname[j]} Owes To ${usersFname[i]} Rs. ${totalAmount}`;
          oweDetails.push(record);
        }
      }
    }
  }
  res.send(oweDetails);
};

module.exports = { displayExpense };
