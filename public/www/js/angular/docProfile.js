//Controlador para vista de perfil de Doctor 
var endpoint = "http://doclinea.com:1414/api_1.0/";
var profileView = angular.module('docProfile', [])
	.controller('ProfileCtrl', function($scope, $http, $routeParams) {

		var type = "Doctor";

		//Capturar ID de la URL
		var id = $routeParams.id;
		$scope.encodedParam = btoa("undefined");

		var This = this;

		//iniciar loading
		$("#doc-profile").css('visibility', 'hidden');
		$('#doc-search-box').show();

		//Servicio GET para cargar perfil de Doctor según su ID
		$http.get(endpoint + type + '/GetById/' + id)
			.success(function(data) {
				if (!data.status) {
					//terminar loading
					$('#doc-search-box').hide();
					$("#doc-profile").css('visibility', 'hidden');
					swal({
						title: "Error de Servidor",
						text: "Ha ocurrido un error al cargar la información del doctor.",
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//Redirección a inicio de página si no se puede cargar el perfil de Doctor
					window.location = "/#/";
				} else {
					//terminar loading
					$('#doc-search-box').hide();
					$("#doc-profile").css('visibility', 'visible');
					This.dProfile = data.response;
				}

				//Cargar mapa de Google Maps
				var mapOptions = {
					zoom: 11,
					center: new google.maps.LatLng(This.dProfile.location_list[0].lat, This.dProfile.location_list[0].lon),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}

				$scope.map = new google.maps.Map(document.getElementById('profile-map'), mapOptions);

				var infoWindow = new google.maps.InfoWindow();

				//cargar ubicación de Doctor en mapa
				var createMarker = function(info) {
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
						title: info.name + ' ' + info.lastname
					});
					marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><h4>' + info.location_list[0].location_name + '</h4><h4>' + info.location_list[0].location_address + '</h4></div></div>';

					google.maps.event.addListener(marker, 'click', function() {
						infoWindow.setContent('<h5 class="info-map-title">' + marker.title + '</h5>' + marker.content);
						infoWindow.open($scope.map, marker);
					});

				}

				createMarker(This.dProfile);
				$scope.encodedParam = btoa("undefined");
			});

		//Función para agregar Doctor actual a Favoritos, por parte de usuario paciente
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
			
			//datos necesarios para agregar el Doctor a favoritos
			var userId = $scope.userData.id;
			var doctorToFav = {};
			doctorToFav.doctor_id = doctorId;

			//Servicio POST para agregar el Doctor a Favoritos
			$http.post(endpoint + "User" + '/Fav/' + userId, doctorToFav)
				.success(function(data) {
					if (!data.status) {
						var error_msg = 'No se pudo agregar el doctor a favoritos.';
						swal({
							title: "",
							text: error_msg,
							type: "error",
							confirmButtonText: "Aceptar",
						});
					} else {
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

//Directiva para Citas Disponibles, el controlador se encuentra en calendarProfile.js
profileView.directive('availableCalendar', function($routeParams) {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/available_appointments.html',
		controller: 'CalendarProfileCtrl',
		controllerAs: 'calProfileCtrl',
	};
});