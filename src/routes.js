"use strict";
const express = require("express");
const router = express.Router();

router.get("/api", (req, res) => {
    res.json({
        message: "Hello Idan :)"
    });
});

module.exports = router;