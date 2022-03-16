const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const categorySchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Category", categorySchema);
