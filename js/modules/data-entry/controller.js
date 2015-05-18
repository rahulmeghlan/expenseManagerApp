// This is the controller to handle the dataEntry operations

//todo : need to scope the expenseMgr
expenseMgr.controller('dataEntry', ['$scope', function ($scope) {
    $scope.expenseMsg = "Add a new expense";
    $scope.formHeader = "Add a new item";
    $scope.isFrOpen = false;
    $scope.items = [
        {
            name: "Andy",
            type: "card",
            spentOn: "Grocery",
            currency: "USD",
            date: "01/08/2013",
            amount: 10
        },
        {
            name: "Candy",
            type: "cash",
            spentOn: "Bar",
            currency: "INR",
            date: "01/08/2013",
            amount: 50
        }
    ];
    $scope.selectedIndex = 0;
    $scope.selectedItem = $scope.items[$scope.selectedIndex];

    $scope.changeFriend = function () {
        $scope.selectedItem = $scope.items[parseInt(this.selectedIndex)];
    };

    $scope.addFriend = function(){
      if($scope.isFrOpen) $scope.isFrOpen = false;
        else $scope.isFrOpen = true;
    };
}]);