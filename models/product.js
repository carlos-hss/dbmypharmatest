const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const productSchema = new mongoose.Schema({
    UUID: {
        type: String,
        required: true,
        default: uuid,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inventory: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Product", productSchema);
