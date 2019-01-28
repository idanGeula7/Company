"use strict";
const employeesDal = require("./employees.dal");

const getEmployeeFormName = async (name) => {
    let employeeGuid = await employeesDal.getGuid(name);
    if (employeeGuid == -1) {
        return employeesDal.create(name);
    } else {
        return employeesDal.getOne(employeeGuid);
    }
};

const getAll = () => (employeesDal.getAll());
const deleteAll = () => (employeesDal.deleteAll());
const deleteOne = (GUID) => (employeesDal.deleteOne(GUID));
const updateOne = (guidForUpdate, newStatus) => (employeesDal.updateOne(guidForUpdate, newStatus));

module.exports = {
    getEmployeeFormName,
    getAll,
    deleteAll,
    deleteOne,
    updateOne
};