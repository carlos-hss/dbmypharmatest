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
        password: req.body.email,
    });

    try {
        const newUser = await user.save();
        res.json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch("/:id", getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name;
    }
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }

    try {
        const editUser = await res.user.save();
        res.json(editUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
