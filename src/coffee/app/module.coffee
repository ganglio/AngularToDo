app = angular.module('moduleDemo', ['ngResource'])

app.factory "Entry", ($resource) ->
	$resource '/data/:id' , {id:'@id'}, {update: {method: 'PUT'}}

@ModuleCtrl = ["$scope", "Entry", ($scope, Entry) ->
	$scope.entries = Entry.query()

	$scope.successToggle = (element) ->
		element.entry.success = 1-element.entry.success
		element.entry.$update()

	$scope.addEntry = ->
		lastID = Math.max.apply Math, $scope.entries.map (e) ->
			return e.id;
		newEntry = new Entry
			id:lastID + 1
			name:$scope.entryName
			success:0
		newEntry.$save()
		$scope.entries.push newEntry
]