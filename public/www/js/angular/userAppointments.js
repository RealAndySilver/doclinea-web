//Modulo y Controlador para Citas de Usuario
var endpoint = "http://192.241.187.135:1414/api_1.0/";

userAppointments = angular.module('userAppointments', []);
userAppointments.controller('AppointmentsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var userId = $routeParams.id;

	//Servicio GET para cargar las citas de un usuario
	$http.get(endpoint + "Appointment" + '/GetForUser/' + userId)
		.success(function(data) {
			if (!data.status) {
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del usuario.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				$scope.appointments = data.response;
			}
		});
}]);