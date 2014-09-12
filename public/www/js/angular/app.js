(function(){

	var app = angular.module('doclinea', [
	  'ngRoute',
	  'mapsApp',
	  'docProfile',
	  //'loginUser',
	  //'createAccount',
	]);
	//var endpoint = "http://192.241.187.135:1414/api_1.0/";
	var endpoint = "http://192.168.1.103:1414/api_1.0/";
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../www/landpage.html'
			}).
			when('/search', {
				templateUrl: '../www/search.html'
			}).
			when('/sign_up', {
				templateUrl: '../www/sign_up.html', 
				controller: 'SignUpController',
			}).
			when('/sign_in', {
				templateUrl: '../www/sign_in.html',
				controller: 'SignInController',
			}).
			when('/user/:userId', {
				templateUrl: '../www/user.html',
				//controller: 'SignInController',
			}).
			when('/doctor/:doctorId', {
				templateUrl: '../www/doctor.html',
				controller: 'ProfileCtrl',
			}).
			otherwise({
				redirectTo: '/404'
			});
	}]);


	//DATA

	var users = [
		{
			id: 1,
			name: 'Carlos',
			lastname: 'Castillo',
			email: 'poleecastillo@gmail.com',
			password: '1234',
		},
	];

	var doctors = [
		{
			id: 1,
			name: 'Gregory',
			lastname: 'House',
			gender: 'Dr.',
			profile_pic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCuaRjPqJfsU6w8aOa4uIfmkqMX-zjS-JqUYPc5rnpwDj751CK',
			practice_list: [
					'Nefrólogo',
					'Infectólogo'
				],
			address: '34875 Princeton, New Jersey',
			description: 'Los métodos poco ortodoxos que utiliza para diagnosticar, las terapias alternativas y la racionalidad incondicional dan como resultado varios conflictos con sus colegas de profesión. A menudo le retratan como una persona carente de simpatía y compasión hacia sus pacientes, una práctica que le permite resolver enigmas patológicos.',
			education_list: [
					'Pontificia Universidad Javeriana',
					'Clínica Universitaria Corpas',
				], 
			professional_membership: 'Asociación Americana de Nefrólogos',
			lat : 41.8819,
			long : -87.6278
		},
		{
			id: 2,
			name: '',
			lastname: 'Dolittle',
			gender: 'Dr.',
			profile_pic: 'http://image.xyface.com/image/d/movie-dr-dolittle-2/dr-dolittle-2-53414.jpg',
			practice_list: [
				'Veterinario',
				'Zootécnico',
			],
			address: '34875 Malibu, Los Angeles',
			description: 'He is a doctor who shuns human patients in favour of animals, with whom he can speak in their own languages.',
			education_list: [
					'Preparatoria Regional de Malibu',
					'Clínica Marly',
				],
			professional_membership: 'Asociación de Zooamantes de Norteamérica', 
			lat : 34.0500,
			long : -118.2500
		},
		{
			id: 3,
			name: '',
			lastname: 'Malito',
			gender: 'Dr.',
			profile_pic: 'http://spa.fotolog.com/photo/10/17/30/juan_caa/1240277762838_f.jpg',
			practice_list: ['Villano', 'Perverso'],
			address: '3487556 Kentucky, Kansas',
			lat : 37.0210,
			long : -96.3300
		},
		{
			id: 4,
			name: 'Emmet',
			lastname: 'Brown',
			gender: 'Dr.',
			profile_pic: 'http://i.ytimg.com/i/Y55LDYTBDs3vFMTh1Pfa3A/mq1.jpg?v=50b39a5d',
			practice_list: ['Físico Cuántico', 'Eléctrico', 'Mecánico'],
			address: '348556 San Luis, Colorado',
			lat : 39.0260,
			long : -104.3505
		},
	];

	/*var signUp = angular.module('createAccount', []);
	
	signUp.controller('SignUpController', function(){
		this._users = users;
		_users = {};
	});*/

	//var login = angular.module('loginUser', []);

	app.controller('SignInController', ['$http',function($http){
		// this.signIn = function(){
		// 	//console.log("hola paola");
		// 	var login = this;
		// 	var data1 = this.data;
		// 	console.log("Data: "+JSON.stringify(data1));
		// 	var type = "User";
		// 	$http.post(endpoint + type + '/AuthenticateUser', data1)
		//         .success(function(data) {
		//             if (data.status) {
		//             	console.log("Listo: "+ data.status);
		//             } else {
		//             	console.log("Paila");
		//             }
		//         }).error(function(error){
		//         	//
		//         });
		// }
		var type = "User";
		this.signIn = function() {
               var data1 = this.data;
               $http.post(endpoint + type + '/AuthenticateUser', data1)
               .success(function(data) {
                   if (!data.status) {
                           console.log("Paila, no se creó",data);
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, creado" + data);
                   }
       });
       this.data = {};
       };
	}]);

	 
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
			marker.content = '<div class="infoWindowContent"><img src="' + info.profile_pic + '" /><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div>';
			
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
				infoWindow.open($scope.map, marker);
			});
			
			$scope.markers.push(marker);
			
		}  
		
		//for (i = 0; i < doctors.length; i++){
			createMarker(doctors[doctorId]);
		//}

		$scope.openInfoWindow = function(e, selectedMarker){
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		}

	});


	var profileView = angular.module('docProfile', [])
	.controller('ProfileCtrl', ['$scope', '$http', '$routeParams', function (scope, http, routeParams) {

		this.doctor = doctors;

		scope.doctorId = routeParams.doctorId;

		/*function initialize() {

			var location = new google.maps.LatLng(39.6753, -104.7720);
			var mapOptions = {
				zoom: 4,
				center: location,
			}

		}*/

		var mapOptions = {
			zoom: 4,
			center: new google.maps.LatLng(40.0000, -98.0000),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		
		scope.map = new google.maps.Map(document.getElementById('profile-map'), mapOptions);

		var createMarker = function (info){
			
			var marker = new google.maps.Marker({
				map: scope.map,
				//position: new google.maps.LatLng(info.lat, info.long),
				position: new google.maps.LatLng(info.lat, info.long),
				//title: info.gender +' '+ info.name +' '+ info.lastname
			});
			//marker.content = '<div class="infoWindowContent"><img src="' + info.profile_pic + '" /><h4>' + info.practice_list + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div>';
			
			/*google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
				infoWindow.open(scope.map, marker);
			});*/
			
		} 

		//google.maps.event.addDomListener(window, 'load', createMarker);

		/*for (i = 0; i < doctors.length; i++){
			createMarker(doctors[i]);
		}*/

		/*scope.openInfoWindow = function(e, selectedMarker){
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		}*/

	}]);


})();