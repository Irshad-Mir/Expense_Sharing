const User = require("../models/userModel");
const isValid = function (value) {
  if (typeof value === "undefined" || value === null) return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

//function to create new user and validation
const createuser = (req, res) => {
 
  const newUser = new User(req.body);
  
  
  newUser
    .save()
    .then((user) => {
      res.status(200).json({
        result: "Success",
        user: user,
        message: `User created Successfully.`,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ result: "Error", message: `Some Error Occured..` });
    });
};

//fetching all users
const fetchUser = (req, res) => {
  User.find({}, (err, user) => {
    res.send(user);
  });
};

//exporting
module.exports = { fetchUser, createuser };
