const express = require("express");
const {
  testUsers,
  searchUsers,
} = require("../../controllers/chatControllers/userControllers");
const Route = express.Router();
// const {
//   searchUsers,
//   testUsers,
// } = require("../../controllers/chatControllers/userControllers");

Route.get("/", searchUsers);

// module.exports = Route;
