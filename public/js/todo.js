angular.module('todo', []).
	config(function($routeProvider) {
		$routeProvider.
			when('/', {controller:TodoCtrl, templateUrl:'list.html'}).
			otherwise({redirectTo:'/'});
	});

function TodoCtrl($scope) {
	$scope.todos = [];

	$scope.getTotalTodos = function() {
		return $scope.todos.length;
	}

	$scope.clearCompleted = function() {
		$scope.todos = $scope.todos.filter(function(todo){
			return !todo.done;
		});
	}

	$scope.addTodo = function() {
		$scope.todos.push({text:$scope.formTodoText, done:false});
		$scope.totalTodos=$scope.todos.length;
		$scope.formTodoText = "";
	}
}


/*function ListCtrl($scope, Project) {
	$scope.projects = Project.query();
}


function CreateCtrl($scope, $location, Project) {
	$scope.save = function() {
		Project.save($scope.project, function(project) {
			$location.path('/edit/' + project._id.$oid);
		});
	}
}


function EditCtrl($scope, $location, $routeParams, Project) {
	var self = this;

	Project.get({id: $routeParams.projectId}, function(project) {
		self.original = project;
		$scope.project = new Project(self.original);
	});

	$scope.isClean = function() {
		return angular.equals(self.original, $scope.project);
	}

	$scope.destroy = function() {
		self.original.destroy(function() {
			$location.path('/list');
		});
	};

	$scope.save = function() {
		$scope.project.update(function() {
			$location.path('/');
		});
	};
}//*/