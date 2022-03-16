const express = require("express");
const router = express.Router();
const User = require("../models/user");

// FUNCTIONS

const getUser = async (req, res, next) => {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.user = user;
    next();
};

// ROUTERS

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", getUser, (req, res) => {
    res.send(res.user);
});

router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
