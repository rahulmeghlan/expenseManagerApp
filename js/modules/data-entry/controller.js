// This is the controller to handle the dataEntry operations

//todo : need to scope the expenseMgr
expenseMgr.controller('dataEntry', ['$rootScope', '$scope', 'ExpenseMgrService', function ($rootScope, $scope, expenseMgrService) {

    var textMsgs = {
        header: {add: "Add a new item", edit: "Edit expense"},
        submitBtn: {add: "Add a new expense", edit: "Done"}
    };

    // This function is used to initialize the app
    var init = function () {
        changeToAddMsg();
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
                amount: 10,
                calculatedAmt: '$ 10'
            },
            {
                name: "Candy",
                type: "Cash",
                spentOn: "Bar",
                currency: "INR",
                date: "2013/08/01",
                amount: 50,
                calculatedAmt: 'Rs 50'
            }
        ];
        $scope.selectedIndex = 1;
        $scope.selectedItem = $scope.items[$scope.selectedIndex];
        expenseMgrService.items = $scope.items;
        expenseMgrService.currencies = $scope.currencies;
    };

    var bindEvents = function () {
        var editItem = $rootScope.$on("editItem", function (event, index) {
            editItems(index);
        });
        $scope.$on("$destroy", editItem);
    };

    var editItems = function (index) {
        $scope.selectedItem = $scope.items[index];
        $scope.selectedIndex = index;
        changeToEditMsg();
    };

    var changeToEditMsg = function () {
        $scope.expenseMsg = textMsgs.submitBtn.edit;
        $scope.formHeader = textMsgs.header.edit;
    };

    var changeToAddMsg = function () {
        $scope.expenseMsg = textMsgs.submitBtn.add;
        $scope.formHeader = textMsgs.header.add;
    };


    $scope.changeFriend = function () {
        $scope.selectedItem = $scope.items[parseInt(this.selectedIndex)];
    };

    $scope.addFriend = function () {
        changeToAddMsg();
        if ($scope.isFrOpen) {
            $scope.items.push(angular.copy($scope.newItem));
            var lastItem = $scope.items.length - 1;
            $scope.selectedIndex = lastItem;
            $scope.selectedItem = $scope.items[lastItem];
            $scope.isFrOpen = false;
        }
        else {
            $scope.isFrOpen = true;
        }
    };

    $scope.submitEntry = function (event) {
        if (event.keyCode === 13) {
            $scope.addFriend();
        }
    };

    $scope.saveExpense = function () {
        expenseMgrService.items = $scope.items;
        $scope.selectedItem = $scope.newItem;
        $scope.selectedIndex = -1;
        $scope.$emit("expenseUpdated");
    };

    init();
    bindEvents();
}]);