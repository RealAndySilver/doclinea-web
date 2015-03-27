//Controlador y Módulo para manejo de sesión
//var endpoint = "http://doclinea.com:1414/api_1.0/";
var session = angular.module('session', []);
session.controller('LoginWelcomeController', ['$scope', '$http', '$location', '$anchorScroll', 'UserService', 'EndpointService', function($scope, $http, $location, $anchorScroll, UserService, EndpointService) {
	var endpoint = EndpointService.ip;
	var self = this;

	//Verificar el tipo de usuario que inicia sesión
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

	//Validar que haya un usuario guardado en local storage
	localStorage.getItem("user");
	if (localStorage.getItem("user")) {
		$scope.userData = JSON.parse(localStorage.user);
	};

	//función para cerrar sesión, borra el usuario guardado en local storage
	this.logout = function() {
		location.reload();
		localStorage.removeItem("user");
		window.location = "/#";
	};

	this.getUsername = function() {
		if(UserService.getUser()) {
			return UserService.getUser().username;
		}
		return '';
	};
	this.getUserId = function() {
		if(UserService.getUser()) {
			return UserService.getUser().id;
		}
		return '';
	}

}]);

//inicializa el usuario que se va a guardar en local storage
session.value('User', {
	username: '',
	isDoctor: false,
	id: '',
	gender: '',
});

//servicio que guarda en local storage al usuario que ha iniciado sesión
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