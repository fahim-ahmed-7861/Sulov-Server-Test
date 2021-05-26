const exporess = require("express");

const router = exporess.Router();

const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const userSchema = require("../Schemas/userSchema");

const User = new mongoose.model("User", userSchema);

const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  // console.log(req.body);

  

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;

    req.body.token = "";

   

    const newUser = new User(req.body);

    

     newUser.token = jwt.sign(
      {
        userEmail: newUser.email,
        userId: newUser._id,
      },
      process.env.JWT_SECRET
    );

    const user = await newUser.save();

    console.log(newUser.token);



    return res.status(200).json({
      registered: true,
      message: "Successfully Resgistered"
     
    });
  } 
  
  catch (err) {
    res.status(500).send('error');
  }
});

router.get("/login/:id", async (req, res) => {
  console.log(process.env.JWT_SECRET);
  try {
    const user = await User.findOne({
      _id: req.params.id,
      email: req.body.email,
    }).select({
      password: 0,
      status: 0,
    });

    res.send({
      data: user,

      success: true,
    });
  } catch (err) {
    res.status(500).send("there was a server site error");
  }
});

router.get("/", async (req, res) => {
  try {
    const alluser = await User.find({});

    return res.status(200).json({
      data: alluser,
    });
  } catch (err) {
    res.status(500).send("there was a server site error");
  }
});


router.put("/:id",async(req,res)=>
{
    try{
             console.log(req.files)
      const file = req.files.file;

      res.send(file);
        

    }
    catch(err)
    {
        res.status(500).send(err);
    }
})

module.exports = router;
