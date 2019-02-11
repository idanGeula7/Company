angular.module("companyApp").factory("statusesService", ["$http", "$q", ($http, $q) => {
    // -----------------------------------------------------------change to service instead of factory
    return {
        getAll: () => {
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http({
                method: "GET",
                url: "/statuses"
            }).then((response) => {
                return response.data;
            }, (response) => {
                // something went wrong
                return $q.reject(response);
            });
        }
    };
}]);