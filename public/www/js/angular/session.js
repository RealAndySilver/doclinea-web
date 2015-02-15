var endpoint = "http://192.241.187.135:1414/api_1.0/";

var session = angular.module('session', []);
session.controller('LoginWelcomeController', ['$scope', '$http', '$location', '$anchorScroll', 'UserService', function($scope, $http, $location, $anchorScroll, UserService) {
	var self = this;

	this.getStatus = function() {
		var user = UserService.getUser();
		var username = user.username;

		if (username) {
			if (user.isDoctor) {
				return 2;
			} else {
				return 1;
			}
		}
		return 0;
	};

	localStorage.getItem("user");
	if (localStorage.getItem("user")) {
		$scope.userData = JSON.parse(localStorage.user);
	};

	this.logout = function() {
		location.reload();
		localStorage.removeItem("user");
		window.location = "/#";
	};

	this.getUsername = function() {
		return UserService.getUser().username;
	};
	this.getUserId = function() {
		return UserService.getUser().id;
	}

}]);

session.value('User', {
	username: '',
	isDoctor: false,
	id: '',
	gender: '',
});

session.service('UserService', ['User', function(User) {
	this.getUser = function() {
		if (!localStorage.getItem("user")) {
			return User;
		}

		var user = JSON.parse(localStorage.getItem("user"));
		User = user;

		return User;
	};
}]);