const express = require("express");

const  storeRouter = express.Router();
const storeController =require('../../controllers/store-controller/store-controller')

storeRouter.post('/', storeController.createStore)
storeRouter.get('/', storeController.getStoreByUserId)
storeRouter.put('/', storeController.updateStore)
storeRouter.delete('/', storeController.deleteStore)

module.exports = storeRouter;