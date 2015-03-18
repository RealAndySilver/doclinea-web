//var endpoint = "http://doclinea.com:1414/api_1.0/";

//Controladores para recuperación de contraseña
var recover = angular.module('recovering', []);
recover.controller('PasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', 'EndpointService', function($http, $routeParams, $modalInstance, $scope, EndpointService) {
	var endpoint = EndpointService.ip;
	
	//función para recuperar contraseña de Doctor
	$scope.docRecover = function() {
		var email = this.recoverCtrl.data.email;
		
		//Servicio GET para obtener email de recuperación de contraseña de Doctor
		$http.get(endpoint + 'Doctor' + '/Recover/' + email)
			.success(function(data) {
				if (!data.status) {
					var email_error = 'Correo electrónico no encontrado.';
					swal({
						title: "",
						text: email_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					$("#doctor-recover-password #email").val('');
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
		$modalInstance.close();
	};
	//Si se cancela el proceso, cerrar ventana modal
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);
recover.controller('UserPasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {

	//función para recuperar contraseña de Usuario
	$scope.userRecover = function() {
		var email = this.userRecoverCtrl.data.email;

		//Servicio GET para obtener email de recuperación de contraseña de Usuario
		$http.get(endpoint + 'User' + '/Recover/' + email)
			.success(function(data) {
				if (!data.status) {
					var email_error = 'Correo electrónico no encontrado.';
					swal({
						title: "",
						text: email_error,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					$("#user-recover-password #email").val('');
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
		$modalInstance.close();
	};
	//Si se cancela el proceso, cerrar ventana modal
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);

//Controlador para nueva contraseña
recover.controller('NewPasswordController', ['$http', '$routeParams', function($http, $routeParams) {

	//Datos que vienen por URL y se necesitan para la nueva contraseña
	var token = $routeParams.token;
	var type = $routeParams.type;
	var email = $routeParams.email;

	//función para agregar una nueva contrseña
	this.sendPassword = function() {
		var data1 = this.data;
		// la contraseña se codifica en base 64
		data1.password = btoa(data1.password);
		if (type == 'doctor') {
			type = 'Doctor';
		};
		if (type == 'user') {
			type = 'User';
		};

		//servicio POST para actualizar la contraseña
		$http.post(endpoint + type + '/NewPassword/' + token, data1)
			.success(function(data) {
				if (!data.status) {
					var send_error = 'Ha ocurrido un error, verifica la contraseña de nuevo.';
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
		//Cuando termina este proceso se redirecciona a la página de inicio	
		window.location = "/#/";
	};
}]);