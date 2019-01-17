"use strict";
const express = require("express");
const router = express.Router();
const employeesBl = require("./employees/employees.bl");

router.get("/employees", (req, res) => {
    employeesBl.getAll().then(
        (data) => {
            res.json(data);
        },
        (error) => {
            res.status(500).json({
                error: error.stack
            });
        });
});

router.get("/employee/:name", (req, res) => {
    employeesBl.loginEmployee(req.params.name).then((status) => {
        res.status(200).json({
            status: status
        });
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });

});

router.delete("/employees", function (req, res) {
    employeesBl.deleteAll().then(() => {
        res.status(204).end();
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });
});

router.delete("/employees/:guid", function (req, res) {
    employeesBl.deleteOne(req.params.guid).then(() => {
        res.status(204).end();
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });
});

module.exports = router;