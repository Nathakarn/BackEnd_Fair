const express = require("express");

const productRoute = express.Router();
const productController = require("../../controllers/product-controller/product-controller");

productRoute.post("/", productController.createProduct);
productRoute.get("/", productController.getProduct);
productRoute.put("/:id" , productController.updateProduct);
productRoute.delete('/:id', productController.deleteProduct);
module.exports = productRoute;
