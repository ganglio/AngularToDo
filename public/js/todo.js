function TodoCtrl($scope) {
	$scope.todos = [];

	$scope.clearCompleted = function() {
		$scope.todos = $scope.todos.filter(function(todo){
			return !todo.done;
		});
	}

	$scope.addTodo = function() {
		if ($scope.formTodoText) {
			$scope.todos.push({text:$scope.formTodoText, done:false});
			$scope.totalTodos=$scope.todos.length;
			$scope.formTodoText = "";
		}
	}
}