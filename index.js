const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const route = require('./route');



var cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.ch6qp.mongodb.net/SulovDb?retryWrites=true&w=majority`;


mongoose.connect(url,{ useUnifiedTopology: true, useNewUrlParser: true})
.then(()=>console.log('connection succesfull'))
.catch(err=>console.log(err));

const app = express();



app.use(bodyParser.json());
app.use(cors()) 

app.use(fileUpload())

app.use(express.static('products'));

//app.use(express.json());



app.use('/product',route.product);

app.use('/category',route.category);

app.use('/user',route.user);

app.use('/order',route.orderHistory);



app.get('/',(req,res)=>
{
    res.send('start');
})

app.listen(5000,()=>
{
    console.log('listen 5000');
})