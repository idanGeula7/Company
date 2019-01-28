"use strict";
const router = require("./routes");
const config = require("./config");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("src/public", {
    index: config.General.firstPage
}));


app.use("/", router);

module.exports = app;