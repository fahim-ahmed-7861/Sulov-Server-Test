const mongoose = require("mongoose");

const orderHistoryShemas = mongoose.Schema({
  
    userInfo : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    },

    orderInfo : {

        type : Object,
        required : true
        
    }

  
});

module.exports = userSchema;