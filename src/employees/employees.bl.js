"use strict";
const employeesDal = require("./employees.dal");
const config = require("../config");

const loginEmployee = (name) => {
    // Best practice error handling when using 2 or more aysnc/await: use catch in the end.
    return new Promise(async (resolve, reject) => {
        try {
            let status = await employeesDal.getStatusFromEmployeeName(name);
            if (status == -1) {
                await employeesDal.create(name);
                resolve(config.employees.defaultStatusValue);
            } else {
                resolve(status);
            }
        } catch (error) {
            // It's already an error object
            reject(error);
        }
    });
};

const getAll = () => {
    return employeesDal.getAll();
};

const deleteAll = () => {
    return employeesDal.deleteAll();
};

const deleteOne = (GUID) => {
    return employeesDal.deleteOne(GUID);
};

module.exports = {
    loginEmployee,
    getAll,
    deleteAll,
    deleteOne
};