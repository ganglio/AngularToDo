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

this.ModuleCtrl = function($scope, Entry) {
  $scope.entries = Entry.query();
  return $scope.successToggle = function(element) {
    if (typeof console !== "undefined" && console !== null) {
      console.log(element.entry);
    }
    element.entry.success = 1 - element.entry.success;
    return element.entry.$update();
  };
};
