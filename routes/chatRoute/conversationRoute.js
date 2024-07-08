const express = require("express");
const {
  create_open_conversation,
} = require("../../controllers/chatControllers/conversationControllers");
const Route = express.Router();

Route.post("/", create_open_conversation);
// Route.get('/', () =>{})

module.exports = Route;
