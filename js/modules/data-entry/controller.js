// This is the controller to handle the dataEntry operations

//todo : need to scope the expenseMgr
expenseMgr.controller('dataEntry', ['$rootScope', '$scope', 'ExpenseMgrService', function ($rootScope, $scope, expenseMgrService) {

    // This function is used to initialize the app
    var init = function () {
        $scope.expenseMsg = "Add a new expense";
        $scope.formHeader = "Add a new item";
        $scope.isFrOpen = false;

        $scope.paymentTypes = ["Card", "Cash", "Other"];
        $scope.currencies = ["USD", "INR", "Euro"];


        $scope.newItem = {
            name: "",
            type: "Other",
            spentOn: "test",
            currency: "Euro",
            date: "2013/08/01",
            amount: 0
        };
        $scope.items = [
            {
                name: "Andy",
                type: "Card",
                spentOn: "Grocery",
                currency: "USD",
                date: "2013/08/01",
                amount: 10
            },
            {
                name: "Candy",
                type: "Cash",
                spentOn: "Bar",
                currency: "INR",
                date: "2013/08/01",
                amount: 50
            }
        ];
        $scope.selectedIndex = 1;
        $scope.selectedItem = $scope.items[$scope.selectedIndex];
        expenseMgrService.items = $scope.items;
        expenseMgrService.currencies = $scope.currencies;
    };

    var bindEvents = function () {
        var deleteItem = $rootScope.$on("deleteItem", function (event, index) {
            $scope.items.splice(index, 1);
        });
        var editItem = $rootScope.$on("editItem", function (event, index) {
            editItems(index);
        });
        $scope.$on("$destroy", deleteItem);
        $scope.$on("$destroy", editItem);
    };

    var editItems = function (index) {
        $scope.selectedItem = $scope.items[index];
        $scope.selectedIndex = index;
        $scope.expenseMsg = "Done";
        $scope.formHeader = "Edit expense";
    };


    $scope.changeFriend = function () {
        $scope.selectedItem = $scope.items[parseInt(this.selectedIndex)];
    };

    $scope.addFriend = function () {
        if ($scope.isFrOpen) {
            $scope.items.push(angular.copy($scope.newItem));

            var lastItem = $scope.items.length - 1;
            $scope.selectedIndex = lastItem;
            $scope.selectedItem = $scope.items[lastItem];
            $scope.newItem.name = "";
            $scope.isFrOpen = false;
        }
        else {
            $scope.isFrOpen = true;
        }
    };

    $scope.saveExpense = function () {
        expenseMgrService.items = $scope.items;
        $scope.$emit("expenseUpdated");
    };

    init();
    bindEvents();
}]);