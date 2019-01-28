"use strict";
const express = require("express");
const router = express.Router();
const employeesBl = require("./employees/employees.bl");
const config = require("./config");

router.get("/statuses", (req, res) => {
    res.status(200).json(config.General.statuses);
});

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

router.post("/employee/:name", (req, res) => {
    employeesBl.getEmployeeFormName(req.params.name).then((employee) => {
        res.status(200).json(employee);
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });

});

router.delete("/employees", (req, res) => {
    employeesBl.deleteAll().then(() => {
        res.status(204).end();
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });
});

router.delete("/employees/:guid", (req, res) => {
    employeesBl.deleteOne(req.params.guid).then(() => {
        res.status(204).end();
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });
});

router.put("/employees/:guid", (req, res) => {
    employeesBl.updateOne(req.params.guid, req.body.status).then(() => {
        res.status(200).end();
    }).catch((error) => {
        res.status(500).json({
            error: error.stack
        });
    });
});
module.exports = router;