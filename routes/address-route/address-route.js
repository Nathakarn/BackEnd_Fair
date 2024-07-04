const express = require('express')
const { createAddress } = require('../../controllers/address-controller/address-controller')

const addressRoute = express.Router()

addressRoute.get('/', createAddress)


module.exports = addressRoute