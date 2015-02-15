//Module and Controller for User Appointments
var endpoint = "http://192.241.187.135:1414/api_1.0/";

userAppointments = angular.module('userAppointments', []);
userAppointments.controller('AppointmentsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var userId = $routeParams.id;

	$http.get(endpoint + "Appointment" + '/GetForUser/' + userId)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron citas", data.error);
				console.log(data);
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del usuario.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				// if successful, bind success message to message
				//console.log("Resultado de busqueda de citas:");
				$scope.appointments = data.response;
				//console.log($scope.appointments);
			}
		});
}]);