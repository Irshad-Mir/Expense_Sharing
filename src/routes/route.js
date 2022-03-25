const express = require("express");
const router = express.Router();
const { fetchGroup, creategroup } = require("../controllers/groupController");
const { fetchUser, createuser } = require("../controllers/userController");
const { displayExpense } = require("../controllers/expenseController");
const { split } = require("../controllers/splitbillController");

router.post("/createuser", createuser);
router.get("/fetchuser", fetchUser);

router.post("/creategroup/:userId", creategroup);
router.get("/fetchgr", fetchGroup);

router.post("/splitbill", split);

router.get("/exp/:gid", displayExpense);


 module.exports = router;
   