angular
    .module('blacklistVal', [])
    .controller('MyCtrl', ['$scope', '$http', function($scope, $http) {
       $scope.blacklistValues = [];
       $scope.name = "";

       console.log($scope.name);
       $scope.submit = function(name) {
           $scope.name = name;
           console.log($scope.name);
           //do Stuff
       };
       
       $http.get('blacklist.json').success(function(data) {
           var i;
           for(i = 0; i < data['blacklistV'].length; i++){
               $scope.blacklistValues.push(data['blacklistV'][i]);
           }
           console.log($scope.blacklistValues);
       });
    }])
    .directive('blacklist', function ($parse) {
        return {
            require:'ngModel',
            link: function (scope, element, attrs, NgModelController) {
                // badWords takes the blacklistValues provided in $scope by MyCtrl controller
                var badWords;
                
                scope.$watch(function () {
                    //console.log(scope[attrs.blacklist]);
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
                           return value.toLowerCase().indexOf(str.toLowerCase()) >= 0; 
                        });
                        //console.log("containsBadWord = " + containsBadWord);
                        NgModelController.$setValidity('blacklist', !containsBadWord);
                    }
                });
                //console.log("NgModelController.$parsers AFTER = " + NgModelController.$parsers);
               // console.log("NgModelController AFTER = " + NgModelController);
            }
        };
    });