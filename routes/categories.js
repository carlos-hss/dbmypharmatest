const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// FUNCTIONS

const getCategory = async (req, res, next) => {
    let category;
    try {
        category = await Category.findById(req.params.id);
        if (category == null) {
            return res
                .status(404)
                .json({ message: "Categoria não encontrada." });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.category = category;
    next();
};

// ROUTERS

router.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    const category = new Category({
        name: req.body.name,
        description: req.body.description,
    });

    try {
        const newCategory = await category.save();
        res.json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", getCategory, async (req, res) => {
    if (req.body.name != null) {
        res.category.name = req.body.name;
    }
    if (req.body.description != null) {
        res.category.description = req.body.description;
    }

    try {
        const editCategory = await res.category.save();
        res.json(editCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", getCategory, async (req, res) => {
    try {
        await res.category.remove();
        res.json({ message: `Categoria "${res.category.name}" Deletada.` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//FILTROS

router.get("/filtros/nome-a-z", async (req, res) => {
    try {
        const categories = await Category.find();
        const sortedArray = categories.sort((a, b) => {
            const category1 = a.name.toUpperCase();
            const category2 = b.name.toUpperCase();
            if (category1 < category2) return -1;
            if (category1 > category2) return 1;
            return 0;
        });
        res.json(sortedArray);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/filtros/nome-z-a", async (req, res) => {
    try {
        const categories = await Category.find();
        const sortedArray = categories.sort((a, b) => {
            const category1 = a.name.toUpperCase();
            const category2 = b.name.toUpperCase();
            if (category1 < category2) return 1;
            if (category1 > category2) return -1;
            return 0;
        });
        res.json(sortedArray);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:search", async (req, res) => {
    const search = req.params.search.toLowerCase();
    try {
        const categories = await Category.find();
        res.json(
            categories.filter(
                (category) =>
                    category.name.toLowerCase().includes(search) ||
                    category.description.toLowerCase().includes(search)
            )
        );
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
