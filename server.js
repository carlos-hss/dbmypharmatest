const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb+srv://dev:OjGhKZbDWwmKtm5f@cluster0.m5gh0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// ROUTERS

const productsRouter = require("./routes/products");
app.use("/produtos", productsRouter);

const brandsRouter = require("./routes/brands");
app.use("/marcas", brandsRouter);

const categoriesRouter = require("./routes/categories");
app.use("/categorias", categoriesRouter);

app.listen(port);
