const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../../controllers/chatControllers/messageControllers");
const Route = express.Router();

Route.post("/", sendMessage);
Route.get("/:convo_id", getMessages);

module.exports = Route;
