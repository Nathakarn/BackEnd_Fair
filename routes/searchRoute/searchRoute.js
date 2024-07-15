const express = require("express");
const {
  searchProduct,
  searchCategory,
} = require("../../controllers/searchController/searchController");
const Route = express.Router();

Route.get("/", searchProduct);
Route.get("/category", searchCategory);

module.exports = Route;
