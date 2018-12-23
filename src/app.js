"use strict";
const mainRouter = require("./routes.js");
const config = require("./config.js");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("src/public", {
    index: config.General.firstPage
}));


app.use("/", mainRouter);

module.exports = app;