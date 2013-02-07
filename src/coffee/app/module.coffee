app = angular.module('moduleDemo', ['ngResource'])

app.factory "Entry", ($resource) ->
	$resource '/data/:id' , {id:'@id'}, {update: {method: 'PUT'}}

@ModuleCtrl = ($scope, Entry) ->
	$scope.entries = Entry.query()

	$scope.successToggle = (element) ->
		console?.log element.entry
		element.entry.success = 1-element.entry.success
		element.entry.$update()