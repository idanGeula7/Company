angular.module("companyApp").factory("employeesService", ["$http", "$q", ($http, $q) => {
    return {
        getAll: () => {
            return $http({
                method: "GET",
                url: "/employees"
            }).then((response) => {
                return response.data;
            }, (response) => {
                return $q.reject(response);
            });
        },
        create: (name) => {
            return $http({
                method: "POST",
                url: `/employee/${name}`
            }).then((response) => {
                return response.data;
            }, (response) => {
                return $q.reject(response);
            });
        },
        deleteAll: () => {
            return $http({
                method: "DELETE",
                url: "/employees"
            }).then({}, (response) => {
                return $q.reject(response);
            });
        },
        deleteOne: (guid) => {
            return $http({
                method: "DELETE",
                url: `/employees/${guid}`
            }).then({}, (response) => {
                return $q.reject(response);
            });
        },
        updateStatus: (guid, statusForUpdate) => {
            return $http({
                method: "PUT",
                url: `/employees/${guid}`,
                data: {
                    status: statusForUpdate
                }
            }).then({}, (response) => {
                return $q.reject(response);
            });
        },
    };
}]);