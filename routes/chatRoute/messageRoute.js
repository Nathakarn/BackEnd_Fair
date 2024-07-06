const express = require("express");
const { sendMessage } = require("../../controllers/chatControllers/messageControllers");
const Route = express.Router();

Route.post("/", sendMessage);

module.exports = Route;