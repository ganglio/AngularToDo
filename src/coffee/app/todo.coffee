window.TodoCtrl =  ($scope) ->
	$scope.todos = []

	$scope.clearCompleted = ->
		$scope.todos = $scope.todos.filter (todo) ->
			return !todo.done

	$scope.addTodo = ->
		if $scope.formTodoText
			$scope.todos.push
				text: $scope.formTodoText
				done:false
			$scope.totalTodos = $scope.todos.length;
			$scope.formTodoText = "";