//Module and Controller for User Favorite Doctors
var endpoint = "http://192.241.187.135:1414/api_1.0/";

userDoctors = angular.module('userDoctors', []);
userDoctors.controller('FavoritesController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var userId = $routeParams.id;

	$http.get(endpoint + "User" + '/GetFavorites/' + userId)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron doctores", data.error);
				console.log(data);
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del usuario.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				// if successful, bind success message to message
				//console.log("Resultado de busqueda de doctores:");
				$scope.favorites = data.response;
				//console.log($scope.favorites);
			}
		});

	$scope.unfavDoctor = function(doctorId) {
		var userId = $routeParams.id;
		var doctorToUnfav = {};
		doctorToUnfav.doctor_id = doctorId;
		console.log('user y doctor ', userId, doctorId);

		$http.post(endpoint + "User" + '/UnFav/' + userId, doctorToUnfav)
			.success(function(data) {
				if (!data.status) {
					console.log("No se agregó", data);
					//console.log(JSON.stringify(data1));
					var error_msg = 'No se pudo eliminar el doctor de favoritos.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor eliminado", data.response);
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