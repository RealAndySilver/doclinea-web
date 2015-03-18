//Modulo y Controlador para Doctores Favoritos de un usuario Paciente
//var endpoint = "http://doclinea.com:1414/api_1.0/";

userDoctors = angular.module('userDoctors', []);
userDoctors.controller('FavoritesController', ['$http', '$scope', '$routeParams', 'EndpointService', function($http, $scope, $routeParams, EndpointService) {
	var endpoint = EndpointService.ip;
	var userId = $routeParams.id;

	//Servicio GET para cargar los doctores favoritos de un usuario
	$http.get(endpoint + "User" + '/GetFavorites/' + userId)
		.success(function(data) {
			if (!data.status) {
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del usuario.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				$scope.favorites = data.response;
			}
		});

	//función para borrar un doctor de la lista de favoritos
	$scope.unfavDoctor = function(doctorId) {
		var userId = $routeParams.id;
		var doctorToUnfav = {};
		doctorToUnfav.doctor_id = doctorId;

		//Servicio POST para eliminar un doctor de la lista de favoritos
		$http.post(endpoint + "User" + '/UnFav/' + userId, doctorToUnfav)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo eliminar el doctor de favoritos.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'El doctor se eliminado de favoritos con éxito!';
					swal({
							title: "",
							text: success_msg,
							type: "success",
							confirmButtonText: "Aceptar",
						},
						function() {
							location.reload();
						});
				}
			});
	}

}]);