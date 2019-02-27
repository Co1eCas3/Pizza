const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const manage_pizza_options = require("./routes/api/admin/manage_pizza_options");
const manage_products = require("./routes/api/admin/manage_products");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("yay"));

const db = require("./config/keys").mongoURI;

mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("connected"))
  .catch(err => console.log(err));

app.use("/api/admin/manage_pizza_options", manage_pizza_options);
// app.use("/api/admin/manage_products", manage_products);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
