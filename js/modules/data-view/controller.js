expenseMgr.controller('dataView', ['$rootScope', '$scope', 'ExpenseMgrService', function ($rootScope, $scope, expenseMgrService) {

    var items = [];
    var invertedArray = [];

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
                price = "€ " + (amount * 0.014).toFixed(2);
                break;
            case "INR_INR":
                price = "Rs " + (amount).toFixed(2);
                break;
            case "USD_INR":
                price = "Rs " + (amount * 63.75).toFixed(2);
                break;
            case "USD_Euro":
                price = "€ " + (amount * 0.89).toFixed(2);
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
                price = "€ " + (amount).toFixed(2);
                break;
        }
        return price;
    };

    var revertArray = function (fieldName) {
        var totalItems = $scope.rows.length,
            temp = {};
        invertedArray = $scope.rows;
        for (var i = 0; i < totalItems - 1; i++) {
            if (invertedArray[i][fieldName] < invertedArray[i + 1][fieldName]) {
                temp = invertedArray[i + 1];
                invertedArray[i + 1] = invertedArray[i];
                invertedArray[i] = temp;
            }
        }
        $scope.rows = invertedArray;
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
                    $scope.rows[i] = items[i];
                }
            }
        }
        revertArray("date");
    };

    $scope.changeCurrency = function () {
        for (var i = 0; i < $scope.rows.length; i++) {
            $scope.rows[i].calculatedAmt = convertCurrency($scope.rows[i].currency, this.selectedCurrency, $scope.rows[i].amount);
        }
    };

    $scope.deleteItem = function (index) {
        /*for (var i = 0; i < $scope.rows.length; i++) {
            if ($scope.rows[i].name === name) {
                $scope.rows.splice(i, 1);
                break;
            }
        }*/
        $scope.rows.splice(index, 1);

    };

    // todo : much work needs to be done in this
    $scope.editItem = function (name) {
        $scope.$emit("editItem", name);
    };

    bindEvents();
    init();
}]);