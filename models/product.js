const mongoose = require("mongoose");

const generateUUID = () => {
    let dt = new Date().getTime();
    let uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};

const productSchema = new mongoose.Schema(
    {
        UUID: {
            type: String,
            required: true,
            default: generateUUID(),
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
    },
    { _id: false }
);

module.exports = mongoose.model("Product", productSchema);
