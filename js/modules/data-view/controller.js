expenseMgr.controller('dataView', ['$rootScope', '$scope', 'ExpenseMgrService', function ($rootScope, $scope, expenseMgrService) {

    var items = [];

    var init = function () {
        $scope.friends = ["All"];
        $scope.currencies = expenseMgrService.currencies; // initialize the currencies based on the default list of data-entry

        $scope.selectedCurrency = $scope.currencies[0];// set the initial value of currencies
        $scope.selectedFriend = $scope.friends[0];// set the initial value of currencies
    };

    var bindEvents = function () {
        var expenseUpdate = $rootScope.$on("expenseUpdated", function () {
            items = expenseMgrService.items;
            $scope.friends = ["All"]; //reinitializing the array
            for (var i = 0; i < items.length; i++) {
                $scope.friends.push(items[i].name);
            }
            $scope.selectInfo();
            $scope.changeCurrency();
        });
        $scope.$on("$destroy", expenseUpdate);
    };

    // This function converts the currency based on the specific values for each currency
    var convertCurrency = function (from, to, amount) {
        var price = "";
        switch (from + "_" + to) {
            case "INR_USD":
                price = "$ " + (amount * 0.016).toFixed(2);
                break;
            case "INR_Euro":
                price = "Euro " + (amount * 0.014).toFixed(2);
                break;
            case "INR_INR":
                price = "Rs " + (amount).toFixed(2);
                break;
            case "USD_INR":
                price = "Rs " + (amount * 63.75).toFixed(2);
                break;
            case "USD_Euro":
                price = "Euro " + (amount * 0.89).toFixed(2);
                break;
            case "USD_USD":
                price = "$  " + (amount).toFixed(2);
                break;
            case "Euro_INR":
                price = "Rs " + (amount * 72.02).toFixed(2);
                break;
            case "Euro_USD":
                price = "$" + (amount * 1.13).toFixed(2);
                break;
            case "Euro_Euro":
                price = "Euro " + (amount).toFixed(2);
                break;
        }
        return price;
    };

    // todo : this can be refactored much better
    $scope.selectInfo = function () {
        $scope.rows = [];
        var selectedFriend = this.selectedFriend;
        if (selectedFriend === "All") {
            $scope.rows = items;
        } else {
            for (var i = 0; i < items.length; i++) {
                if (items[i].name === selectedFriend) {
                    $scope.rows[0] = items[i];
                }
            }
        }
    };

    $scope.changeCurrency = function () {
        for (var i = 0; i < $scope.rows.length; i++) {
            $scope.rows[i].calculatedAmt = convertCurrency($scope.rows[i].currency, this.selectedCurrency, $scope.rows[i].amount);
        }
    };

    $scope.deleteItem = function (index) {
        $scope.rows.splice(index, 1);
    };

    $scope.editItem = function (index) {
        $scope.$emit("editItem", index);
    };

    bindEvents();
    init();
}]);