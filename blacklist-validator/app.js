angular.module('blacklistVal', [])
    .directive('blacklist', function ($parse) {
        return {
            require:'ngModel',
            link: function (scope, element, attrs, NgModelController) {
                // badWords takes the blacklistValues provided in $scope by MyCtrl controller
                // $parse returns a function
                var badWords = $parse(attrs.blacklist)(scope) || [];
                console.log("badWords = " + badWords);
                console.log("NgModelController BEFORE = " + NgModelController);
                console.log("NgModelController.$parsers BEFORE = " + NgModelController.$parsers);
                
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
                console.log("NgModelController.$parsers AFTER = " + NgModelController.$parsers);
                console.log("NgModelController AFTER = " + NgModelController);
            }
        };
    })
    .controller('MyCtrl', function($scope) {
       $scope.blacklistValues = ['hello', 'bye', "Hi"]; 
    });