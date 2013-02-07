
this.TodoCtrl = function($scope) {
  $scope.todos = [];
  $scope.clearCompleted = function() {
    return $scope.todos = $scope.todos.filter(function(todo) {
      return !todo.done;
    });
  };
  $scope.addTodo = function() {
    if ($scope.formTodoText) {
      $scope.todos.push({
        text: $scope.formTodoText,
        done: false
      });
      $scope.totalTodos = $scope.todos.length;
      return $scope.formTodoText = "";
    }
  };
  return $scope.noMoreDone = function() {
    var howmany;
    howmany = $scope.todos.filter(function(todo) {
      return todo.done;
    }).length;
    return howmany === 0;
  };
};
