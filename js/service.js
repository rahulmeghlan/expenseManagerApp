//ExpenseMgrService : This will be used to communicate data between data-entry and data-view controllers
expenseMgr.service("ExpenseMgrService", function () {
    var self = this;

    self.items = []; //this will store the list of items to be used by the expense viewer
});