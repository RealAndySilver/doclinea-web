var endpoint = "http://192.241.187.135:1414/api_1.0/";

//Controller for Account Confirmation
var verify = angular.module('verify', []);
verify.controller('AccountConfirmationController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	var type = $routeParams.type;
	var email = $routeParams.email;
	console.log(type, email);

	data1 = {};
	data1.email = atob(email);
	console.log(data1);

	this.sendEmailVerification = function() {
		//console.log('enviando correo...');
		$http.post(endpoint + "Account" + '/SendEmailVerification/' + type + "/" + email, data1)
			.success(function(data) {
				if (!data.status) {
					console.log("El correo no puede ser reenviado", data);
					var send_error = 'El correo no puede ser reenviado.';
					swal({
						title: "",
						text: send_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					//console.log("Ha sido enviado el correo" + data);
					var success_msg = 'Tu solicitud ha sido enviada con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
						//timer: 800,
					});
				}
			});
	};
}]);

//Controller for Account Activation
verify.controller('AccountActivationController', ['$http', '$routeParams', '$scope', function($http, $routeParams, $scope) {
	$scope.type = $routeParams.type;
	console.log($scope.type);
}]);