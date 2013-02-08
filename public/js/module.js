var app;

app = angular.module('moduleDemo', ['ngResource']);

app.factory("Entry", function($resource) {
  return $resource('/data/:id', {
    id: '@id'
  }, {
    update: {
      method: 'PUT'
    }
  });
});

this.ModuleCtrl = [
  "$scope", "Entry", function($scope, Entry) {
    $scope.entries = Entry.query();
    $scope.successToggle = function(element) {
      element.entry.success = 1 - element.entry.success;
      return element.entry.$update();
    };
    return $scope.addEntry = function() {
      var lastID, newEntry;
      lastID = Math.max.apply(Math, $scope.entries.map(function(e) {
        return e.id;
      }));
      newEntry = new Entry({
        id: lastID + 1,
        name: $scope.entryName,
        success: 0
      });
      newEntry.$save();
      return $scope.entries.push(newEntry);
    };
  }
];
