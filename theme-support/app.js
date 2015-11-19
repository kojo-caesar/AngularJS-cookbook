angular.module("myApp", [])
        .factory("ThemeService", function() {
            var themes = {
                available: ["gray", "green", "red", "blue"],
                active: "gray"
            };
            function getTheme() {
                return themes.active;
            }
            function setTheme(theme) {
                console.log(theme);
                if (themes.available.indexOf(theme) === -1) { return; }
                themes.active = theme;
            }
            return {
                getTheme: getTheme,
                setTheme: setTheme,
                themes: themes.available
            };
        })
        .controller("HeadCtrl", function($scope, ThemeService) {
            $scope.getTheme = ThemeService.getTheme;
        })
        .controller("MainCtrl", function($scope, ThemeService) {
            $scope.setTheme = ThemeService.setTheme;
            $scope.themes = ThemeService.themes;
        });