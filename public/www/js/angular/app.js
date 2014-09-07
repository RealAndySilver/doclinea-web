(function(){

	var app = angular.module('doclinea', [
	  'ngRoute',
	  'mapsApp',
	]);

	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: 'www/landpage.html'
			}).
			when('/search', {
				templateUrl: 'www/search.html'
			}).
			when('/sign_up', {
				templateUrl: 'www/sign_up.html'
			}).
			when('/sign_in', {
				templateUrl: 'www/sign_in.html'
			}).
			when('/doctor/:doc_name', {
				templateUrl: 'www/doctor.html'
			}).
			/*when('/doctor/gregory_house#doc-book', {
				templateUrl: 'www/doctor.html'
			}).*/
			otherwise({
				redirectTo: '/404'
			});
	}]);




	//Data
var doctors = [
	{
		name: 'Gregory',
		lastname: 'House',
		gender: 'Dr.',
		profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCuaRjPqJfsU6w8aOa4uIfmkqMX-zjS-JqUYPc5rnpwDj751CK',
		practice_list: 'Nefrólogo',
		address: '34875 Princeton, New Jersey',
		lat : 41.8819,
		long : -87.6278
	},
	{
		name: '',
		lastname: 'Dolittle',
		gender: 'Dr.',
		profile_pic: 'http://image.xyface.com/image/d/movie-dr-dolittle-2/dr-dolittle-2-53414.jpg',
		practice_list: 'Veterinario',
		address: '34875 Malibu, Los Angeles',
		lat : 34.0500,
		long : -118.2500
	},
	{
		name: '',
		lastname: 'Malito',
		gender: 'Dr.',
		profile_pic: 'http://spa.fotolog.com/photo/10/17/30/juan_caa/1240277762838_f.jpg',
		practice_list: 'Villano',
		address: '3487556 Kentucky, Kansas',
		lat : 37.0210,
		long : -96.3300
	},
	{
		name: 'Emmet',
		lastname: 'Brown',
		gender: 'Dr.',
		profile_pic: 'http://i.ytimg.com/i/Y55LDYTBDs3vFMTh1Pfa3A/mq1.jpg?v=50b39a5d',
		practice_list: 'Físico Cuántico',
		address: '348556 San Luis, Colorado',
		lat : 39.0260,
		long : -104.3505
	},
];

//Angular App Module and Controller
var mapView = angular.module('mapsApp', [])
.controller('MapCtrl', function ($scope) {

	this.docs = doctors;

	var mapOptions = {
		zoom: 4,
		center: new google.maps.LatLng(40.0000, -98.0000),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}

	$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

	$scope.markers = [];
	
	var infoWindow = new google.maps.InfoWindow();
	
	var createMarker = function (info){
		
		var marker = new google.maps.Marker({
			map: $scope.map,
			position: new google.maps.LatLng(info.lat, info.long),
			title: info.gender +' '+ info.name +' '+ info.lastname
		});
		marker.content = '<div class="infoWindowContent"><img src="' + info.profile_pic + '" /><h4>' + info.practice_list + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div>';
		
		google.maps.event.addListener(marker, 'click', function(){
			infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
			infoWindow.open($scope.map, marker);
		});
		
		$scope.markers.push(marker);
		
	}  
	
	for (i = 0; i < doctors.length; i++){
		createMarker(doctors[i]);
	}

	$scope.openInfoWindow = function(e, selectedMarker){
		e.preventDefault();
		google.maps.event.trigger(selectedMarker, 'click');
	}

});





})();