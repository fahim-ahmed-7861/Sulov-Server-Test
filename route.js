

const producHandler = require('./routeHandler/productHandler');

const categoryHandler = require('./routeHandler/categoryHandler');

const userHandler = require('./routeHandler/userHandler');


const route={

     product : producHandler,

     category : categoryHandler,

     user : userHandler,








}

module.exports = route;

