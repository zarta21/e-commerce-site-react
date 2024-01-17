const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    img: { type: String, required: true },
    img2: { type: String },
    img3: { type: String },
    img4: { type: String },
    brand: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: String, required: true },
    oldPrice: { type: String },
    size: { type: Array, required: true },
    color: { type: Array, required: true },
    category: { type: Array, required: true},
    subCategory: { type: Array, required: true },
    subSubCategory: { type: Array, required: true },
}, { timestamps: true, writeConcern: {
    w: 'majority',
    j: true,
    wtimeout: 1000
  } });

module.exports = mongoose.model("Product", ProductSchema);
