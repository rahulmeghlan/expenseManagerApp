expenseMgr.controller('dataView', ['$rootScope', '$scope', 'ExpenseMgrService', function ($rootScope, $scope, expenseMgrService) {

    var init = function () {
//        $scope.items = ["all"];
//        $scope.items.push(expenseMgrService.items); // initialise the items based on the default list of data-entry
        $scope.currencies = expenseMgrService.currencies; // initialize the currencies based on the default list of data-entry

        $scope.selectedCurrency = $scope.currencies[0];// set the initial value of currencies
    };

    var bindEvents = function () {
        $rootScope.$on("expenseUpdated", function () {
            $scope.items = expenseMgrService.items;
        })
    };

    bindEvents();
    init();
}]);