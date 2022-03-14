const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const getProduct = async (req, res, next) => {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Cannot find product" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
};

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getProduct, (req, res) => {
    res.send(res.product.name);
});

router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        inventory: req.body.inventory,
        category: req.body.category,
        brand: req.body.brand,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
