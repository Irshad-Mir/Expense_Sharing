const Splitbill = require("../models/splitbillModel");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const Expense = require("../models/expenseModel");


const split = async (req, res) => {

  var expenses = [];

  
  var flag = 0;

 
  const newSplitBill = new Splitbill(req.body);

 
  const group = await Group.findById(req.body.gid);
  console.log(group)

   
  if (!group.members.includes(req.body.paidBy))
    return res.status(400).send({ message: "Invalid payee!!" });

  
  if (req.body.sharedBy.length == 0)
    return res.status(400).send({ message: "No Members in group!!" });

 
  for (let i = 0; i < req.body.sharedBy.length; i++) {
    if (!group.members.includes(req.body.sharedBy[i]))
      return res.send({ message: "Invalid members in group!!" });
  }

  
  newSplitBill.save().catch((err) => {
    res
      .status(400)
      .json({ result: "Error", message: `Failed to update data in database` });
  });

 
  if (req.body.expenseType == "PERCENT") {
    let percentSharingStructure = req.body.sharingStructure;
    let sharedBy = req.body.sharedBy;

    //validating if sum of percentage is 100%
    let sum = Object.values(percentSharingStructure).reduce((a, b) => {
      return a + b;
    });
    if (sum != 100) {
      flag = 1;
    } else {
      
      for (let i = 0; i < sharedBy.length; i++) {
        
        let amount = (
          (percentSharingStructure[sharedBy[i]] / 100) *
          req.body.amount
        ).toFixed(2);

       
        const expense = new Expense({
          groupId: req.body.gid,
          from: req.body.paidBy,
          to: sharedBy[i],
          amount: amount,
        });

        expenses.push(expense);

        //saving data in dataBase
        expense.save().catch((err) => {
          res.status(400).json({ result: "Error", message: `Error is ${err}` });
        });
      }
    }
  } 
  else if (req.body.expenseType == "EQUAL") {
    let sharedBy = req.body.sharedBy;

    
    let amount = (req.body.amount / (sharedBy.length + 1)).toFixed(2);

    
    for (let i = 0; i < sharedBy.length; i++) {
      
      const expense = new Expense({
        groupId: req.body.gid,
        from: req.body.paidBy,
        to: sharedBy[i],
        amount: amount,
      });
      expenses.push(expense);

      //saving data in dataBase
      expense.save().catch((err) => {
        res.status(400).json({ result: "Error", message: `Error is ${err}` });
      });
    }
  } 
  else {
    let exactSharingStructure = req.body.sharingStructure;
    let sharedBy = req.body.sharedBy;

    
    for (let i = 0; i < Object.keys(exactSharingStructure).length; i++) {
      let amount = exactSharingStructure[sharedBy[i]];

      
      const expense = new Expense({
        groupId: req.body.gid,
        from: req.body.paidBy,
        to: sharedBy[i],
        amount: amount,
      });
      expenses.push(expense);

      
      expense.save().catch((err) => {
        res.status(400).json({ result: "Error", message: `Error is ${err}` });
      });
    }
  } 
  if (flag != 1) {
    res.status(200).json({
      result: "Success",
      message: `Split Bill Info Updated Successfully`,
      expenses: expenses,
    });
  } else {
    res
      .status(402)
      .send(
        "Sum of entered percentages is not 100. Please enter complete details"
      );
  }
};

//exporting controller
module.exports = { split };
