

const producHandler = require('./routeHandler/productHandler');

const categoryHandler = require('./routeHandler/categoryHandler');

const userHandler = require('./routeHandler/userHandler');

const orderHistoryHandler = require('./routeHandler/orderHistoryHandler');


const route={

     product : producHandler,

     category : categoryHandler,

     user : userHandler,

     orderHistory : orderHistoryHandler,








}

module.exports = route;

