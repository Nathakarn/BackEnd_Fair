// product-route.js

const express = require("express");
const productRoute = express.Router();
const productController = require("../../controllers/product-controller/product-controller");

productRoute.post("/", productController.createProduct);
productRoute.get("/", productController.getAllProducts);
productRoute.put("/:id", productController.updateProduct);
productRoute.delete("/:id", productController.deleteProduct);

productRoute.get('/store/:store_id', productController.getProductsByStoreId);
productRoute.get("/price-desc", productController.getProductsByPriceDesc);
productRoute.get("/category/:category", productController.getProductsByCategory);

productRoute.get("/user/:store_id", productController.getUser);

module.exports = productRoute;


