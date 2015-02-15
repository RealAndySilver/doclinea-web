//PROFILES LIST + MAP WITH DOCTORS LOCATIONS
var endpoint = "http://192.241.187.135:1414/api_1.0/";

var mapView = angular.module('searchList', [])
mapView.controller('MapCtrl', function($scope, $http, $routeParams) {

	var docData = this;
	var type = "Doctor";

	docData.docs = $scope.getDrCtrl.data1;

	//console.log('Mi data es ', docData.docs);

	var This = this;

	$('#doc-search-box').show();
	$http.post(endpoint + type + '/GetByParams', docData.docs)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron doctores", data.error);
				console.log(data);
				$('#doc-search-box').hide();
				$(".doc-box").css('visibility', 'hidden');
				swal({
					title: "",
					text: "No se encontraron doctores con los criteros de búsqueda introducidos, vuelve a intentarlo.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				// if successful, bind success message to message
				console.log("Resultado de busqueda de doctores:");
				console.log(data.response);
				$('#doc-search-box').hide();

				This.docs = data.response;
				//console.log(JSON.stringify(this.docs));
			}

			var mapOptions = {
				zoom: 5,
				center: new google.maps.LatLng(4.670033, -74.0598163),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

			$scope.markers = [];
			var infoWindow = new google.maps.InfoWindow();

			var createMarker = function(info) {
				//console.log('ENTRA A CREAR MARKER');
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

			for (i = 0; i < (This.docs).length; i++) {
				createMarker(This.docs[i]);
			}

			$scope.openInfoWindow = function(e, selectedMarker) {
				e.preventDefault();
				google.maps.event.trigger(selectedMarker, 'click');
			}

		});

});