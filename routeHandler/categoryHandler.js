const exporess = require('express');

const router = exporess.Router();

const mongoose = require("mongoose");

const categorySchema = require('../Schemas/categorySchema');

const Category = new mongoose.model("Category",categorySchema);


router.post('/add',async(req,res)=>
{
  try{

  const file = req.files.file;


  await file.mv(`${__dirname.replace('routeHandler','')}images/${file.name}`);

  req.body.pic = file.name;


    const newCategory = new Category(req.body);

    newCategory.save((err)=>
    {
        if(err)
         return res.status(500).json({
             insertCount : false,
             error : 'There was a server site error',
         })

         else {
           return  res.status(200).json({
               
                insertCount : true,
                message : "Successfully Inserted",
             }
             )
         }
    })

  }

    catch(e)
    {
      res.status(500).json({
        insertCount : false,
        error : 'There was a server site error',
    })

    }


})


router.get('/',(req,res)=>
{
    Category.find({})
    .populate('products')
    .exec((err,data)=>
    {
        if(err) {
       
            res.status(500).json({

                dataRead : false,
                
                error: 'There was a server site error',
            })
        }
        else{

            res.status(200).json({

                dataRead : true,

                result : data,
                
                message: "Successfully Read",
            })


        }
    })
})

router.get('/:id',(req,res)=>
{
    Category.find({_id : req.params.id})
    .populate('products')
    .exec((err,data)=>
    {
        if(err) {
       
            res.status(500).json({

                dataRead : false,
                
                error: 'There was a server site error',
            })
        }
        else{

            res.status(200).json({

                dataRead : true,

                result : data,
                
                message: "Successfully Read",
            })


        }
    })
})


router.put("/:id", (req, res) => {

    
    Category.findByIdAndUpdate(
      { 
          _id: req.params.id },
      {
        $set: {
            pic : req.body.pic
        },
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err,data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
            updateCount : false,
          });
        } else {
          res.status(200).json({
            message: "Category was updated successfully!",
            result : data ,
            updateCount : true
          });
        }
      }
    );
   
  });




module.exports = router;