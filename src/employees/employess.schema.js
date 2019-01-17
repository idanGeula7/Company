const mongoose = require("mongoose");
const config = require("../config");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const employeeSchema = new Schema({
    GUID: {
        type: Number
    },
    name: {
        type: String,
        match: /[a-z]/
    },
    status: {
        type: String,
        default: config.employees.defaultStatusValue
    }
});


module.exports = {
    employeeSchema
};