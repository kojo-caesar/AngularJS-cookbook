angular.module("myApp", [])
    .controller("MainCtrl", function($scope) {
        var initialData = {
            "firstName": "Ion",
            "lastName": "Dolonescu"
        };
        
        $scope.form = angular.copy(initialData);
        $scope.reset = function() {
            console.log("before = " + $scope.form.firstName);
            $scope.form = angular.copy(initialData);
            console.log("after = " + $scope.form.firstName);
        };
    });