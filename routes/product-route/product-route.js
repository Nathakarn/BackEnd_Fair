const express = require("express");

const productRoute = express.Router();
const productController = require("../../controllers/product-controller/product-controller");

productRoute.post("/", productController.createProduct);
productRoute.get("/", productController.getAllProducts);
productRoute.get("/:id", productController.getProductById);
productRoute.put("/:id" , productController.updateProduct);
productRoute.delete('/:id', productController.deleteProduct);

productRoute.get('/price-desc', productController.getProductsByPriceDesc);
productRoute.get('/category/:category', productController.getProductsByCategory);
module.exports = productRoute;
