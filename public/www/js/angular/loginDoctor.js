var endpoint = "http://doclinea.com:1414/api_1.0/";

//Módulo y Controlador para inicio de sesión de Doctor
var loginDoctor = angular.module('loginDoctor', []);
loginDoctor.controller('DoctorSignInController', ['$http', '$scope', '$routeParams', '$location', '$anchorScroll', 'User', function($http, $scope, $routeParams, $location, $anchorScroll, User) {
	var type = "Doctor";

	//función para iniciar sesión como Doctor
	this.signIn = function() {
		var data1 = this.data;
		//la contraseña se codifica en base 64
		data1.password = btoa(data1.password);

		//Servicio POST para autenticar Doctor
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
					var doc = data.response;
					//Se redirecciona al Doctor a su Dashboard
					window.location = "/#/doctor_dashboard/" + doc._id;

					User.username = doc.name + ' ' + doc.lastname;
					User.id = doc._id;
					User.isDoctor = true;
					User.email = doc.email;

					//el usuario Doctor se guarda en local storage para mantener su sesión activa
					localStorage.setItem('user', JSON.stringify(User));
				}
			});
	};
}]);