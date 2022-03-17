const express = require("express");
const router = express.Router();
const Brand = require("../models/brand");

// FUNCTIONS

const getBrand = async (req, res, next) => {
    let brand;
    try {
        brand = await Brand.findById(req.params.id);
        if (brand == null) {
            return res.status(404).json({ message: "Marca não encontrada." });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.brand = brand;
    next();
};

// ROUTERS

router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getBrand, (req, res) => {
    res.send(res.brand);
});

router.post("/", async (req, res) => {
    const brand = new Brand({
        name: req.body.name,
    });

    try {
        const newBrand = await brand.save();
        res.json(newBrand);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", getBrand, async (req, res) => {
    if (req.body.name != null) {
        res.brand.name = req.body.name;
    }

    try {
        const editBrand = await res.brand.save();
        res.json(editBrand);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", getBrand, async (req, res) => {
    try {
        await res.brand.remove();
        res.json({ message: `Marca "${res.brand.name}" Deletada.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//FILTERS

router.get("/:search", async (req, res) => {
    const search = req.params.search.toLowerCase();
    try {
        const brands = await Brand.find();
        res.json(
            brands.filter((brand) => brand.name.toLowerCase().includes(search))
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
