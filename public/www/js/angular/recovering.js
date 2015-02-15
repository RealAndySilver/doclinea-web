//Controllers for Password Recovering
var endpoint = "http://192.241.187.135:1414/api_1.0/";

var recover = angular.module('recovering', []);
recover.controller('PasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {
	//console.log('Entra a recover');
	$scope.docRecover = function() {
		var email = this.recoverCtrl.data.email;
		console.log(email);
		$http.get(endpoint + 'Doctor' + '/Recover/' + email)
			.success(function(data) {
				if (!data.status) {
					console.log("El correo no existe o no pudo ser enviado", data);
					var email_error = 'Correo electrónico no encontrado.';
					swal({
						title: "",
						text: email_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					$("#doctor-recover-password #email").val('');
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
		$modalInstance.close();
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);
recover.controller('UserPasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {
	//console.log('Entra a recover');
	$scope.userRecover = function() {
		var email = this.userRecoverCtrl.data.email;
		console.log(email);
		$http.get(endpoint + 'User' + '/Recover/' + email)
			.success(function(data) {
				if (!data.status) {
					console.log("El correo no existe o no pudo ser enviado", data);
					var email_error = 'Correo electrónico no encontrado.';
					swal({
						title: "",
						text: email_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					$("#user-recover-password #email").val('');
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
		$modalInstance.close();
	};
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);
recover.controller('NewPasswordController', ['$http', '$routeParams', function($http, $routeParams) {
	console.log('Entra a new password');

	var token = $routeParams.token;
	var type = $routeParams.type;
	var email = $routeParams.email;
	console.log(token, type, email);

	this.sendPassword = function() {
		var data1 = this.data;
		data1.password = btoa(data1.password);
		//data1.password_verify = btoa(data1.password_verify);
		//console.log(data1.password);
		if (type == 'doctor') {
			type = 'Doctor';
		};
		if (type == 'user') {
			type = 'User';
		};
		$http.post(endpoint + type + '/NewPassword/' + token, data1)
			.success(function(data) {
				if (!data.status) {
					//console.log("El correo no existe o no pudo ser enviado", data);
					var send_error = 'Ha ocurrido un error, verifica la contraseña de nuevo.';
					swal({
						title: "",
						text: send_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//$("#doctor-recover-password #email").val('');
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
		window.location = "/#/";
	};
}]);