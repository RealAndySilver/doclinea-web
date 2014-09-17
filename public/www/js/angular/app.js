(function(){

	var app = angular.module('doclinea', [
	  'ngRoute',
	  'mapsApp',
	  'docProfile',
	  'loginUser',
	  'loginDoctor',
	  'createUser',
	  'createDoctor',
	  //'listDoctors',
	]);
	var endpoint = "http://192.241.187.135:1414/api_1.0/";
	//var endpoint = "http://192.168.1.101:1414/api_1.0/";
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../www/landpage.html'
			}).
			when('/search/:city/:practice_list/:insurance_list', {
				templateUrl: '../www/search.html',
				//controller: 'MapCtrl'
			}).
			when('/sign_up', {
				templateUrl: '../www/sign_up.html', 
				//controller: 'SignUpController',
			}).
			when('/sign_in', {
				templateUrl: '../www/sign_in.html',
				//controller: 'SignInController',
			}).
			when('/user/:userId', {
				templateUrl: '../www/user.html',
				controller: 'SignInController',
			}).
			when('/doctor/:doctorId', {
				templateUrl: '../www/doctor.html',
				controller: 'ProfileCtrl',
			}).
			when('/doctor_sign_up', {
				templateUrl: '../www/doctor_sign_up.html',
			}).
			when('/doctor_sign_in', {
				templateUrl: '../www/doctor_sign_in.html',
			}).
			otherwise({
				redirectTo: '/404'
			});
	}]);


	//DATA
	var locationsBogota = [
		{
			name: "Antonio Nariño",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Barrios Unidos",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Bosa",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Chapinero",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Ciudad Bolivar",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Engativá",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Fontibón",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Keneddy",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "La Candelaria",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Los Mártires",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Puente Aranda",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Rafael Uribe",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "San Cristóbal",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Santa Fe",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Suba",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Sumapaz",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Teusaquillo",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Tunjuelito",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Usaquén",
			lat: 4.5,
			lon: 74.5,	
		},
		{
			name: "Usme",
			lat: 4.5,
			lon: 74.5,	
		},
	];	


	//ACCOUNTS AND AUTHENTICATION
	var createUser = angular.module('createUser', []);
	createUser.controller('SignUpController', ['$http',function($http){
		var type = "User";
		//console.log('hola '+type);
		/*this.test = function(){
			console.log('TODO BIEN PICHURRIA');
		};*/
		this.signUp = function() {
				//console.log('Entra a signUp');
               var data1 = this.data;
               $http.post(endpoint + type + '/SignUp', data1)
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


	var login = angular.module('loginUser', []);
	login.controller('SignInController', ['$http',function($http){
		var type = "User";
		this.signIn = function() {
				//console.log('Entra a signIn');
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

	var createDoctor = angular.module('createDoctor', []);
	createDoctor.controller('DoctorSignUpController', ['$http', function($http){

		this.locations = locationsBogota;

		var type = "Doctor";
		//console.log('hola '+type);
		/*this.test = function(){
			console.log('TODO BIEN PICHURRIA');
		};*/
		this.signUp = function() {
				//console.log('Entra a signUp');
               var data1 = this.data;
               $http.post(endpoint + type + '/SignUp', data1)
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

	var loginDoctor = angular.module('loginDoctor', []);
	loginDoctor.controller('DoctorSignInController', ['$http',function($http){
		var type = "Doctor";
		this.signIn = function() {
				//console.log('Entra a signIn');
               var data1 = this.data;
               $http.post(endpoint + type + '/SignInDoctor', data1)
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


	//GET DOCTOR BY SEARCH PARAMS - to search page
	//var loginDoctor = angular.module('loginDoctor', []);
	app.controller('DoctorSearchController', ['$http',function($http){
		var type = "Doctor";
		this.searchDoctor = function() {
			console.log(this.data);
			window.location = "/#/search/" + this.data.city + "/" + this.data.practice_list + "/" + this.data.insurance_list;
       		this.data = {};
       };
	}]);


	//PROFILES 
	var mapView = angular.module('mapsApp', [])
	mapView.controller('MapCtrl', function ($scope, $http, $routeParams) {

		this.docs = [];

		var city = $routeParams.city;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;

		var data1 = {};

		if(city !== "undefined") {
			data1.city = city;
		}

		if(practice_list !== "undefined") {
			data1.practice_list = practice_list;
		}

		if(insurance_list !== "undefined") {
			data1.insurance_list = insurance_list;
		}


		console.log('Entra a Doctores');
		console.log(data1);

		var This = this;
               
      	$http.post(endpoint + "Doctor" + '/GetDoctorsByParams', data1)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data);
               		console.log(data);
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de doctores:");
               		console.log(data);

               		This.docs = data.response;

               		console.log(JSON.stringify(this.docs));

           		}
       });

		/*

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
		
		for (i = 0; i < doctors.length; i++){
			createMarker(doctors[i]);
		}

		$scope.openInfoWindow = function(e, selectedMarker){
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		}
		*/
		

	});


	var profileView = angular.module('docProfile', [])
	.controller('ProfileCtrl', ['$scope', '$http', '$routeParams', function (scope, http, routeParams) {

		/*this.doctor = doctors;

		scope.doctorId = routeParams.doctorId;

		function initialize() {

			var location = new google.maps.LatLng(39.6753, -104.7720);
			var mapOptions = {
				zoom: 4,
				center: location,
			}

		}

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
			});
			
		}

		//google.maps.event.addDomListener(window, 'load', createMarker);

		for (i = 0; i < doctors.length; i++){
			createMarker(doctors[i]);
		}

		scope.openInfoWindow = function(e, selectedMarker){
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		}*/

	}]);


})();