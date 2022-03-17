const express = require("express");
const cors = require("cors");
const mongoConnect = require("./mongo");

const app = express();

app.use(cors());
app.use(express.json());

mongoConnect.connect();
// ROUTERS

const productsRouter = require("./routes/products");
app.use("/produtos", productsRouter);

const brandsRouter = require("./routes/brands");
app.use("/marcas", brandsRouter);

const categoriesRouter = require("./routes/categories");
app.use("/categorias", categoriesRouter);

const usersRouter = require("./routes/users");
app.use("/usuarios", usersRouter);

module.exports = app;
