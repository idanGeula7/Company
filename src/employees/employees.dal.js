// Move to employees dal and bl
const employeeSchema = require("./employess.schema").employeeSchema;
const mongoose = require("../dbManager").mongoose;
const Employee = mongoose.model("Employee", employeeSchema);

// Create (on login)
const create = (name) => {
    return new Promise((resolve, reject) => {
        let newEmployee = new Employee({
            name: name,
            GUID: Math.floor(Math.random() * 100000)
        });

        newEmployee.save((error) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve();
        });
    });
};

//Get all (to fill the employee's table after login)
const getAll = () => {
    return new Promise((resolve, reject) => {
        Employee.find({}, (error, employees) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve(employees.map((employee) => {
                return {
                    "name": employee.name,
                    "GUID": employee.GUID,
                    "status": employee.status
                };
            }));
        });
    });
};

// Read one (on login)
// (get status if exists (by sending name), "-1" otherwise)
const getStatusFromEmployeeName = (name) => {
    return new Promise((resolve, reject) => {
        Employee.find({
            name: name
        }, (error, result) => {
            if (error) {
                reject(new Error(error));
            } else {
                if (result.length > 0) {
                    resolve(result[0].status);
                } else {
                    resolve(-1);
                }
            }
        });
    });
};

const deleteAll = () => {
    return new Promise((resolve, reject) => {
        Employee.deleteMany({}, (error) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve();
        });
    });
};

const deleteOne = (GUID) => {
    return new Promise((resolve, reject) => {
        Employee.deleteOne({
            "GUID": GUID
        }, (error) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve();
        });
    });
};



// Update (for setting status)

module.exports = {
    create,
    getAll,
    getStatusFromEmployeeName,
    deleteAll,
    deleteOne
};