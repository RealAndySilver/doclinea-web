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

	//función para cancelar cita por parte de usuario
	$scope.cancelAppointment = function(appointmentId) {
		data1 = {};
		data1.user_id = userId;

		//Servicio POST para cancelar cita 
		$http.post(endpoint + "Appointment" + '/Cancel/' + appointmentId + '/' + "user", data1)
		.success(function(data) {
			if (!data.status) {
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del usuario.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				swal({
					title: "",
					text: "La cita ha sido eliminada con éxito.",
					type: "success",
					confirmButtonText: "Aceptar",
				});
				function() {
					location.reload();
				});
			}
		});
	}
}]);