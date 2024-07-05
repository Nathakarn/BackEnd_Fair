const express = require("express");
const {
  createUser,
} = require("../../controllers/chatControllers/userControllers");
const Route = express.Router();

Route.post("/", createUser);
// Route.get('/', () =>{})

module.exports = Route;
