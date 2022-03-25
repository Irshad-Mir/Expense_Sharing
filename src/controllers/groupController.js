const Group = require("../models/groupModel");
const User = require("../models/userModel");

//function to create new group

const creategroup = async (req, res) => {
  
  let members = req.body.members;
  console.log(members)
  members.push(req.params.userId);
  const newGroup = await new Group({"gname": req.body.gname, "members": members,});
  newGroup.save().then((group) => { res.status(200).json({result: "Success", group: newGroup,message: `Group created Successfully.`,
      });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ result: "Error", message: `Some Error Occured..` });
    });
};


const fetchGroup = async function (req, res) {
  try {
    const list = await Group.find();

    res.status(200).send({ status: true, message: "fetch group", data: list });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { fetchGroup, creategroup };
