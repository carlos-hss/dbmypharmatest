const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// FUNCTIONS

const getProduct = async (req, res, next) => {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
};

// ROUTERS

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getProduct, (req, res) => {
    res.send(res.product);
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
        res.json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", getProduct, async (req, res) => {
    if (req.body.name != null) {
        res.product.name = req.body.name;
    }
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.price != null) {
        res.product.price = req.body.price;
    }
    if (req.body.inventory != null) {
        res.product.inventory = req.body.inventory;
    }
    if (req.body.category != null) {
        res.product.category = req.body.category;
    }
    if (req.body.brand != null) {
        res.product.brand = req.body.brand;
    }

    try {
        const editProduct = await res.product.save();
        res.json(editProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: `Produto "${res.product.name}" Deletado.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//FILTROS

router.get("/filtros/nome-a-z", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.sort((a, b) => a.name - b.name));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/filtros/nome-z-a", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.sort((a, b) => b.name - a.name));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/filtros/marca-a-z", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.sort((a, b) => a.brand - b.brand));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/filtros/marca-z-a", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.sort((a, b) => b.brand - a.brand));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/filtros/categoria-a-z", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.sort((a, b) => a.category - b.category));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/filtros/categoria-z-a", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products.sort((a, b) => b.category - a.category));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:search", async (req, res) => {
    const search = req.params.search.toLowerCase();
    try {
        const products = await Product.find();
        res.json(
            products.filter(
                (product) =>
                    product.name.toLowerCase().includes(search) ||
                    product.description.toLowerCase().includes(search) ||
                    product.brand.toLowerCase().includes(search) ||
                    product.category.toLowerCase().includes(search)
            )
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
