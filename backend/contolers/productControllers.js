const Product = require('../models/productModel')

// GET ALL products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(400).json({ error: error.message})
        
    }
}

// GET single product
const getProduct = async (req, res) => {
    // const { id } = req.params

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
         res.status(400).json({ error: error.message})
    }
}

module.exports = {getProducts, getProduct}
