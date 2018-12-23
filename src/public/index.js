angular.module("companyApp", [])
    .controller("employeesCtrl", function ($scope) {
        $scope.name1 = "";
        $scope.greeting1 = `Hello ${$scope.name1}`;
        $scope.employeesArray = [{
                name: "Idan",
                status: "on vacation"
            },
            {
                name: "Asaf",
                status: "on a business trip"
            },
            {
                name: "Tamir",
                status: "working"
            },
            {
                name: "Yossi",
                status: "sick"
            },
            {
                name: "Yotam",
                status: "working"
            },
        ];
    });