require("dotenv").config();

const express = require("express");
const app = express();
let cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

app.listen(PORT, () => console.log(`Server: ${PORT}`));