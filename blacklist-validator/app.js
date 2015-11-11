angular
    .module('blacklistVal', [])
    .controller('MyCtrl', ['$scope', '$http', function($scope, $http) {
       $scope.blacklistValues = ['Ola'];
       //console.log(typeof $scope.blacklistValues, $scope.blacklistValues);
       
       $http.get('blacklist.json').success(function(data) {
           var arr = $scope.blacklistValues;
           for(var x = 0; x < data['blacklistV'].length; x++){
               arr.push(data['blacklistV'][x]);
           }
           $scope.blacklistValues = arr;
           //console.log(typeof $scope.blacklistValues, $scope.blacklistValues);
       });
    }])
    .directive('blacklist', function ($parse) {
        return {
            require:'ngModel',
            link: function (scope, element, attrs, NgModelController) {
                // badWords takes the blacklistValues provided in $scope by MyCtrl controller
                // $parse returns a function
                // var badWords = $parse(attrs.blacklist)(scope) || [];
                var badWords;
                
                scope.$watch(function () {
                    return scope[attrs.blacklist];
                }, function (newValue, oldValue) {
                    badWords = newValue || [];
                });
                
                //console.log("badWords = " + badWords);
                //console.log("NgModelController BEFORE = " + NgModelController);
                //console.log("NgModelController.$parsers BEFORE = " + NgModelController.$parsers);
                
                // Functions added to $parsers are called as soon as the value in the form input is modified by the user
                NgModelController.$parsers.push(function (value) {
                    // console.log(value);
                    if (value) {
                        // if item from badWords matches value containsBadWord = true 
                        var containsBadWord = badWords.some(function(str) {
                           return value.indexOf(str) >= 0; 
                        });
                        console.log("containsBadWord = " + containsBadWord);
                        NgModelController.$setValidity('blacklist', !containsBadWord);
                    }
                });
                //console.log("NgModelController.$parsers AFTER = " + NgModelController.$parsers);
               // console.log("NgModelController AFTER = " + NgModelController);
            }
        };
    });
