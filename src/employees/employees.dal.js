// Move to employees dal and bl
const employeeSchema = require("./employess.schema").employeeSchema;
const mongoose = require("../dbManager").mongoose;
const Employee = mongoose.model("Employee", employeeSchema);

// Create (on login)
// returns the created employee
const create = (name) => {
    return new Promise((resolve, reject) => {
        let newEmployee = new Employee({
            name: name,
            GUID: Math.floor(Math.random() * 100000)
        });

        newEmployee.save((error, createdEmployee) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve({
                name: createdEmployee.name,
                GUID: createdEmployee.GUID,
                status: createdEmployee.status
            });
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

const getOne = (guid) => {
    return new Promise((resolve, reject) => {
        Employee.find({
            GUID: guid
        }, (error, result) => {
            if (error) {
                reject(new Error(error));
            } else {
                if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject(new Error(`getOneByName function failed. Employee GUID ${guid} doesn't exist`));
                }
            }
        });
    });
};

// Gets GUID from employee name.
// Returns -1 if it doesn't exist.
const getGuid = (name) => {
    return new Promise((resolve, reject) => {
        Employee.find({
            name: name
        }, (error, result) => {
            if (error) {
                reject(new Error(error));
            } else {
                if (result.length > 0) {
                    resolve(result[0].GUID);
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

const deleteOne = (guid) => {
    return new Promise((resolve, reject) => {
        Employee.deleteOne({
            GUID: guid
        }, (error) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve();
        });
    });
};

const updateOne = (guidForUpdate, newStatus) => {
    return new Promise((resolve, reject) => {
        Employee.findOneAndUpdate({
            GUID: guidForUpdate
        }, {
            status: newStatus
        }, (error) => {
            if (error) {
                return reject(new Error(error));
            }
            resolve();
        });
    });
};



module.exports = {
    create,
    getAll,
    getOne,
    getGuid,
    deleteAll,
    deleteOne,
    updateOne
};