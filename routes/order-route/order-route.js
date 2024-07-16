const express = require("express");
// const { getallorder } = require('../../controllers/order-controller/order-controller')
const { createOrder, deleteorderById } = require('../../controllers/order-controller/order-controller')
const { getorderById } = require('../../controllers/order-controller/order-controller')

<<<<<<< HEAD
const orderRoute = express.Router();
=======

const orderRoute = express.Router()
>>>>>>> 4efe238da627dd19fcc35dacaea8b2943a6baed6

// orderRoute.get('/', getallorder )
orderRoute.get('/', getorderById)
orderRoute.post('/', createOrder)
orderRoute.delete('/:id', deleteorderById )

module.exports = orderRoute;
