//Controller for Doctor Profile
var endpoint = "http://192.241.187.135:1414/api_1.0/";

var profileView = angular.module('docProfile', [])
	.controller('ProfileCtrl', function($scope, $http, $routeParams) {

		var type = "Doctor";
		var id = $routeParams.id;
		$scope.encodedParam = btoa("undefined");

		var This = this;

		$http.get(endpoint + type + '/GetById/' + id)
			.success(function(data) {
				if (!data.status) {
					console.log("No se encontró un doctor con correo:", data);
					swal({
						title: "Error de Servidor",
						text: "Ha ocurrido un error al cargar la información del doctor.",
						type: "error",
						confirmButtonText: "Aceptar",
					});
					window.location = "/#/";
				} else {
					// if successful, bind success message to message
					console.log("El doctor encontrado es:");
					console.log(data);

					This.dProfile = data.response;
					//console.log(JSON.stringify(dProfile.name));
				}

				var mapOptions = {
					zoom: 11,
					center: new google.maps.LatLng(This.dProfile.location_list[0].lat, This.dProfile.location_list[0].lon),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}

				$scope.map = new google.maps.Map(document.getElementById('profile-map'), mapOptions);

				//$scope.markers = [];
				var infoWindow = new google.maps.InfoWindow();

				var createMarker = function(info) {
					//console.log('ENTRA A CREAR MARKER');
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
						title: info.name + ' ' + info.lastname
					});
					marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><h4>' + info.location_list[0].location_address + '</h4></div></div>';

					google.maps.event.addListener(marker, 'click', function() {
						infoWindow.setContent('<h5 class="info-map-title">' + marker.title + '</h5>' + marker.content);
						infoWindow.open($scope.map, marker);
					});

					//$scope.markers.push(marker);
				}

				createMarker(This.dProfile);
				$scope.encodedParam = btoa("undefined");
			});

		$scope.favDoctor = function(doctorId) {
			if (localStorage.getItem("user")) {
				$scope.userData = JSON.parse(localStorage.user);
			} else {
				var error_msg = 'Recuerda iniciar tu sesión primero.';
				swal({
					title: "",
					text: error_msg,
					type: "warning",
					confirmButtonText: "Aceptar",
				});
			}
			
			var userId = $scope.userData.id;
			var doctorToFav = {};
			doctorToFav.doctor_id = doctorId;

			$http.post(endpoint + "User" + '/Fav/' + userId, doctorToFav)
				.success(function(data) {
					if (!data.status) {
						console.log("No se agregó", data);
						//console.log(JSON.stringify(data1));
						var error_msg = 'No se pudo agregar el doctor a favoritos.';
						swal({
							title: "",
							text: error_msg,
							type: "error",
							confirmButtonText: "Aceptar",
						});
					} else {
						// if successful, bind success message to message
						console.log("Listo, doctor agregado", data.response);
						var success_msg = 'El doctor se agregó a favoritos con éxito!';
						swal({
							title: "",
							text: success_msg,
							type: "success",
							confirmButtonText: "Aceptar",
						});
					}
				});
		}

	});

//Controller for Doctor Appointments on Profile
profileView.directive('availableCalendar', function($routeParams) {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/available_appointments.html',
		controller: 'CalendarProfileCtrl',
		controllerAs: 'calProfileCtrl',
	};
});