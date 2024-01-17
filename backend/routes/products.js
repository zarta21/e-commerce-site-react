const express = require('express')
const router = express.Router()
const {getProducts, getProduct} = require('../controllers/productControllers')


// GET ALL products
router.get('/', getProducts)

// GET single product
router.get('/:id', getProduct)

module.exports = router
