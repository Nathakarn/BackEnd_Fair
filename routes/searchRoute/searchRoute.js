const express = require("express");
const {
  searchProduct,
} = require("../../controllers/searchController/searchController");
const Route = express.Router();

Route.get("/", searchProduct);

module.exports = Route;
