angular
    .module("myApp", [])
    .controller("myCtrl", function($scope) {
        $scope.user = {};
        $scope.wasSubmitted = false;
        
        $scope.submit = function() {
            $scope.wasSubmitted = true;
        };
    });