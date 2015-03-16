//Módulo y Controlador para crear cuenta de Usuario Paciente
var createUser = angular.module('createUser', []);
createUser.controller('SignUpController', ['$http', '$scope', function($http, $scope) {
	var type = "User";

	//función para crear cuenta
	this.signUp = function() {
		var data1 = this.data;
		data1.password = btoa(data1.password);
		data1.birthday = data1.birthday.getTime();

		//Servicio POST para crear cuenta
		$http.post(endpoint + type + '/Create', data1)
			.success(function(data) {
				if (!data.status) {
					swal({
						title: "",
						text: "Ha ocurrido un error, por favor inténtalo nuevamente.",
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var user = data.response;
					var type = "user";
					var email = btoa(user.email);
					//Redirección a formulario de confirmación de cuenta
					window.location = "/#/account_confirmation/" + type + "/" + email;
				}
			});
	};
}]);