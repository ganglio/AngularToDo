
window.TodoCtrl = function($scope) {
  $scope.todos = [];
  $scope.clearCompleted = function() {
    return $scope.todos = $scope.todos.filter(function(todo) {
      return !todo.done;
    });
  };
  return $scope.addTodo = function() {
    if ($scope.formTodoText) {
      $scope.todos.push({
        text: $scope.formTodoText,
        done: false
      });
      $scope.totalTodos = $scope.todos.length;
      return $scope.formTodoText = "";
    }
  };
};
