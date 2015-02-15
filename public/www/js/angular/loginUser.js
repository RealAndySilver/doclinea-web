var endpoint = "http://192.241.187.135:1414/api_1.0/";

var login = angular.module('loginUser', []);
login.controller('SignInController', ['$http', 'User', function($http, User) {
	var type = "User";
	this.signIn = function() {
		//console.log('Entra a signIn');
		var data1 = this.data;
		data1.password = btoa(data1.password);
		$http.post(endpoint + type + '/Authenticate', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se autenticó", data);
					var auth_error = data.error;
					if (data.error_id == 0) {
						swal({
							title: "",
							text: "Email o contraseña incorrectos.",
							type: "error",
							confirmButtonText: "Aceptar",
						});
					} else if (data.error_id == 1) {
						swal({
							title: "",
							text: "Recuerda activar primero tu cuenta.",
							type: "error",
							confirmButtonText: "Aceptar",
						});
					} else {
						swal({
							title: "",
							text: "Ha ocurrido un error, por favor inténtalo nuevamente.",
							type: "error",
							confirmButtonText: "Aceptar",
						});
					}
				} else {
					// if successful, bind success message to message
					console.log("Listo, autenticado" + data);
					var user = data.response;
					window.location = "/#/user/" + user._id;

					User.username = user.name + ' ' + user.lastname;
					User.isDoctor = false;
					User.id = user._id;
					User.gender = user.gender;
					User.email = user.email;

					console.log('Mi objeto USUARIO es', User);

					// Store
					localStorage.setItem('user', JSON.stringify(User));
				}
			});
		//this.data = {};
	};
}]);