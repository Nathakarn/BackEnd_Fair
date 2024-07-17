const express = require("express");

const  storeRouter = express.Router();
const storeController =require('../../controllers/store-controller/store-controller')

storeRouter.post('/', storeController.createStore);
storeRouter.get('/', storeController.getAllStores);
storeRouter.get('/:id', storeController.getStoreByUserId);
storeRouter.put('/:id', storeController.updateStore);
storeRouter.delete('/:id', storeController.deleteStore);

module.exports = storeRouter;