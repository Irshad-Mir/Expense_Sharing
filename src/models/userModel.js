const mongoose = require("mongoose");

//defining Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
    
  },

  mobile: {
    type: Number,
    require: true,
    unique: true,
    maxlength: 10,
    minlength: 10,
    match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
  },
});

//exporting schema
module.exports = mongoose.model("User", userSchema);
