"use strict";
let app = angular.module("companyApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "loginView.html"
        })
        .when("/employeesView", {
            templateUrl: "employeesView.html"
        });
});

app.controller("employeesCtrl", function ($scope, $http, $location) {
    $scope.employeesArray = [];
    $scope.employeeStatus;
    $scope.employeeName;

    $scope.fillEmployeesTable = () => {
        $http({
            method: "GET",
            url: "/employees"
        }).then((result) => {
            $scope.employeesArray = result.data;
        }, (response) => {
            alert(`Can't get data form db: ${JSON.stringify(response.data.error)}`);
        });
    };

    $scope.deleteAllEmployees = () => {
        $http({
            method: "DELETE",
            url: "/employees"
        }).then(() => {
            alert("All the employees were deleted");
        }, (response) => {
            alert(`Can't delete all employees: ${JSON.stringify(response.data.error)}`);
        });

        $scope.logoff();
    };

    $scope.login = (name) => {
        $scope.employeeName = name;
        //create an employee or getName
        // send name, and get status for the label in the next page
        // if the name exists - the status, otherwise - "none" status
        // the bl will create the employee if necessary
        $http({
            method: "GET",
            url: `/employee/${name}`
        }).then((result) => {
            $scope.employeeStatus = result.data.status;
            $scope.fillEmployeesTable();
            $location.url("/employeesView");
        }, (response) => {
            alert(`Can't get employee data: ${JSON.stringify(response.data.error)}`);
        });
    };

    $scope.logoff = () => {
        $location.url("/");
    };
});