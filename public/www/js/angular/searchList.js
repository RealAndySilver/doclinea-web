//var endpoint = "http://doclinea.com:1414/api_1.0/";

//Modulo y Controlador para mostrar resultados de búsqueda de Doctores
var mapView = angular.module('searchList', [])
mapView.controller('MapCtrl', function($scope, $http, $routeParams, EndpointService) {
	var endpoint = EndpointService.ip;

	var docData = this;
	var type = "Doctor";
	var doctorArray = [];

	//aquí se guardan los parámetros de búsqueda seleccionados en el formulario
	docData.docs = $scope.getDrCtrl.data1;

	//iniciar loading
	$('#doc-search-box').show();

	//Servicio POST para cargar lista de doctores con los parámetros establecidos
	$http.post(endpoint + type + '/GetByParams', docData.docs)
		.success(function(data) {
			if (!data.status) {
				//terminar loading
				$('#doc-search-box').hide();
				$(".doc-box").css('visibility', 'hidden');
				swal({
					title: "",
					text: "No se encontraron doctores con los criteros de búsqueda introducidos, vuelve a intentarlo.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				//terminar loading
				$('#doc-search-box').hide();
				docData.doctorArray = data.response;
			}

			//cargar mapa de Google Maps
			var mapOptions = {
				zoom: 5,
				center: new google.maps.LatLng(4.670033, -74.0598163),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			$scope.markers = [];
			var infoWindow = new google.maps.InfoWindow();

			//mostrar marcador en el mapa
			var createMarker = function(info) {
				var marker = new google.maps.Marker({
					map: $scope.map,
					position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
					title: info.name + ' ' + info.lastname
				});
				marker.content = '<div class="infoWindowContent"><img src="' + info.profile_pic.image_url + '" width="60px" /><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.city + '</h4><br><h4>' + info.location_list[0].location_address + '</h4></div></div>';

				google.maps.event.addListener(marker, 'click', function() {
					infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
					infoWindow.open($scope.map, marker);
				});

				$scope.markers.push(marker);
			}

			//agregar por cada doctor encontrado, un marcador con su ubicación
			for (i = 0; i < (docData.docs).length; i++) {
				createMarker(docData.docs[i]);
			}

			$scope.openInfoWindow = function(e, selectedMarker) {
				e.preventDefault();
				google.maps.event.trigger(selectedMarker, 'click');
			}

		});

});