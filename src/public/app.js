"use strict";
let app = angular.module("companyApp", ["ngRoute"]);

app.config(($routeProvider) => {
    $routeProvider
        .when("/", {
            templateUrl: "loginView.html"
        })
        .when("/employeesView", {
            templateUrl: "employees/employeesView.html"
        });
});


app.controller("employeesCtrl", ["$scope", "$http", "$location", "statusesService", "employeesService",
    ($scope, $http, $location, statusesService, employeesService) => {

        $scope.init = () => {
            $scope.employeesArray = [];
            $scope.statusesArray = [];
            $scope.currentEmployee = {};
            getStatusList();
        };

        let getStatusList = () => {
            statusesService.getAll().then((statuses) => {
                $scope.statusesArray = statuses;
            }, (response) => {
                log(`Can't get statuses form db: ${JSON.stringify(response)}`);
            });
        };

        let refreshEmployeesTable = () => {
            employeesService.getAll().then((employees) => {
                $scope.employeesArray = employees;
            }, (response) => {
                log(`Can't get data form db: ${JSON.stringify(response.data.error)}`);
            });
        };

        $scope.deleteAllEmployees = () => {
            employeesService.deleteAll().then(() => {
                log("All the employees were deleted");
            }, (response) => {
                log(`Can't delete all employees: ${JSON.stringify(response.data.error)}`);
            });

            $scope.logoff();
        };

        $scope.deleteEmployee = (guid) => {
            if (guid == $scope.currentEmployee.GUID) {
                console.log("You can't delete yourself");
                return;
            }

            employeesService.deleteOne(guid).then(refreshEmployeesTable(), (response) => {
                log(`Can't delete employee: ${JSON.stringify(response.data.error)}`);
            });
        };

        $scope.updateStatus = (statusForUpdate) => {
            employeesService.updateStatus($scope.currentEmployee.GUID, statusForUpdate).then(() => {
                refreshEmployeesTable();
                $scope.currentEmployee.status = statusForUpdate;
            }, (response) => {
                log(`Can't update employee: ${JSON.stringify(response.data.error)}`);
            });
        };

        $scope.login = (name) => {
            // employeesService will create an employee if necessary
            employeesService.create(name).then((employee) => {
                $scope.currentEmployee = employee;
                refreshEmployeesTable();
                $location.url("/employeesView");
            }, (response) => {
                log(`Can't get employee data: ${JSON.stringify(response.data.error)}`);
            });
        };

        $scope.logoff = () => {
            $location.url("/");
        };

        let log = (log) => {
            alert(log);
        };
    }
]);