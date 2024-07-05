const express = require('express')
const { getallAddress } = require('../../controllers/address-controller/address-controller')
const { createAddress } = require('../../controllers/address-controller/address-controller')
const { updateAddress } = require('../../controllers/address-controller/address-controller')
const { deleteAddress } = require('../../controllers/address-controller/address-controller')

const addressRoute = express.Router()

addressRoute.get('/', getallAddress )
addressRoute.post('/', createAddress)
addressRoute.put('/', updateAddress)
addressRoute.delete('/', deleteAddress)


module.exports = addressRoute