//Controlador para confirmación de creación de cuenta
var verify = angular.module('verify', []);
verify.controller('AccountConfirmationController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	var type = $routeParams.type;
	var email = $routeParams.email;

	data1 = {};
	data1.email = atob(email);

	//Servicio POST para enviar email de verificación de cuenta
	this.sendEmailVerification = function() {
		$http.post(endpoint + "Account" + '/SendEmailVerification/' + type + "/" + email, data1)
			.success(function(data) {
				if (!data.status) {
					var send_error = 'El correo no puede ser reenviado.';
					swal({
						title: "",
						text: send_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'Tu solicitud ha sido enviada con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}
			});
	};
}]);

//Controlador para activación de cuenta
verify.controller('AccountActivationController', ['$http', '$routeParams', '$scope', function($http, $routeParams, $scope) {
	//establecer el tipo de cuenta que se va a activar
	$scope.type = $routeParams.type;
}]);