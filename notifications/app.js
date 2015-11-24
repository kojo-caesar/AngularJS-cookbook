angular.module("notifications",[])
    .factory("NotificationService", function($timeout) {
       var counterG = 0,
           list = [];
        function getCounter() { 
            return counterG++;
        }
        function getList() {
            return list;
        }
        function add(text, timeout) {
            var counter = getCounter();
            list.push({ id: counter, text: text});
            $timeout(function() { remove(counter); },
                    (timeout || 3000)
                    );
        }
        function remove(id){
            for(var i=0; i<list.length; i++) {
                if(list[i].id === parseInt(id)) {
                    return list.splice(i, 1);
                }
            }
        }
        return {
            add: add,
            remove: remove,
            getList: getList
        };
    })
    .controller("NotificationsCtrl", function($scope, NotificationService) {
        $scope.notifications = NotificationService;
    })
    .controller("MainCtrl", function($scope, NotificationService) {
        $scope.addNotification = function() {
            NotificationService.add(new Date(), 5000);
        };
    });