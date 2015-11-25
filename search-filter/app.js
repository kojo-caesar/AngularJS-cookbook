angular.module("search-filter", ['ngSanitize'])
    .filter("highlight", function() {
        return function(input, search) {
            if (search === '') return input;
            else {
                var searchRegExp = new RegExp('(' + search + ')','gi');
                return input.replace(searchRegExp, '<span class="highlight">$1</span>');
            }
        };
    })
    .controller("MainCtrl", function($scope) {
        $scope.items = ['Ceas', "Caine", "Laptop", "Bec", "Lapte", "Apa", "Zebra"];
    });