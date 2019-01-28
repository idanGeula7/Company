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
    $scope.statusesArray = [];
    $scope.currentEmployee = {};

    $http({
        method: "GET",
        url: "/statuses"
    }).then((result) => {
        $scope.statusesArray = result.data;
    }, (response) => {
        alert(`Can't get statuses form db: ${JSON.stringify(response)}`);
    });

    $scope.refreshEmployeesTable = () => {
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

    $scope.deleteEmployee = (guid) => {
        if (guid == $scope.currentEmployee.GUID) {
            cpnsole.log("You can't delete yourself");
            return;
        }

        $http({
            method: "DELETE",
            url: `/employees/${guid}`
        }).then($scope.refreshEmployeesTable(), (response) => {
            alert(`Can't delete employee: ${JSON.stringify(response.data.error)}`);
        });
    };

    $scope.updateStatus = (statusForUpdate) => {
        $http({
            method: "PUT",
            url: `/employees/${$scope.currentEmployee.GUID}`,
            data: {
                status: statusForUpdate
            }
        }).then($scope.refreshEmployeesTable(), (response) => {
            alert(`Can't update employee: ${JSON.stringify(response.data.error)}`);
        });
    };

    $scope.login = (name) => {
        // the BL will create an employee if necessary
        $http({
            method: "POST",
            url: `/employee/${name}`
        }).then((result) => {
            $scope.currentEmployee = result.data;
            $scope.refreshEmployeesTable();
            $location.url("/employeesView");
        }, (response) => {
            alert(`Can't get employee data: ${JSON.stringify(response.data.error)}`);
        });
    };

    $scope.logoff = () => {
        $location.url("/");
    };
});