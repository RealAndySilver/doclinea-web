//var endpoint = "http://doclinea.com:1414/api_1.0/";

//Módulo y Controlador para iniciar sesión como Usuario Paciente
var login = angular.module('loginUser', []);
login.controller('SignInController', ['$http', 'User', 'EndpointService', function($http, User, EndpointService) {
	var endpoint = EndpointService.ip;
	var type = "User";

	//función para iniciar sesión como Usuario paciente
	this.signIn = function() {
		var data1 = this.data;
		//la contraseña se codifica en base 64
		data1.password = btoa(data1.password);

		//servicio POST para autenticar usuario paciente
		$http.post(endpoint + type + '/Authenticate', data1)
			.success(function(data) {
				if (!data.status) {
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
					var user = data.response;
					//Se redirecciona al usuario a su Dashboard
					window.location = "/#/user/" + user._id;

					User.username = user.name + ' ' + user.lastname;
					User.isDoctor = false;
					User.id = user._id;
					User.gender = user.gender;
					User.email = user.email;

					//el usuario Paciente se guarda en local storage para mantener su sesión activa
					localStorage.setItem('user', JSON.stringify(User));

					setTimeout(function() {
						location.reload();
					}, 400);
				}
			});
	};
}]);