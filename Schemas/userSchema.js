const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
  },
  password: {
      type: String,
      required: true,
  },
  pic : {
      type : String,
      required : true,

  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  token : {
       type : String ,

       required : true,

  },
  Address : String,

  orderHistory: [
    {
      type: mongoose.Types.ObjectId,
      ref: "OrderHistory"
    }
  ]
});

module.exports = userSchema;