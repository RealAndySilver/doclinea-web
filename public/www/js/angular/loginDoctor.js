var endpoint = "http://192.241.187.135:1414/api_1.0/";

var loginDoctor = angular.module('loginDoctor', []);
loginDoctor.controller('DoctorSignInController', ['$http', '$scope', '$routeParams', '$location', '$anchorScroll', 'User', function($http, $scope, $routeParams, $location, $anchorScroll, User) {
	var type = "Doctor";

	this.signIn = function() {
		//console.log('Entra a signIn');
		var data1 = this.data;
		data1.password = btoa(data1.password);
		// data1.password_verify = btoa(data1.password_verify);
		$http.post(endpoint + type + '/Authenticate', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se autenticó", data);
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
					console.log("Listo, doctor autenticado", data.response);
					var doc = data.response;
					//console.log('la data es', doc);
					window.location = "/#/doctor_dashboard/" + doc._id;

					User.username = doc.name + ' ' + doc.lastname;
					User.id = doc._id;
					User.isDoctor = true;
					User.email = doc.email;

					// Store
					localStorage.setItem('user', JSON.stringify(User));
				}
			});
		//this.data = {};
	};
}]);