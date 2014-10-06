(function(){

	var app = angular.module('doclinea', [
	  'ngRoute',
	  'mapsApp',
	  'loginUser',
	  //'loginDoctor',
	  'createUser',
	  'createDoctor',
	  'docProfile',
	]);

	var endpoint = "http://192.241.187.135:1414/api_1.0/";
	//var endpoint = "http://192.168.1.100:1414/api_1.0/";
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../www/landpage.html'
			}).
			when('/search/:city/:practice_list/:insurance_list', {
				templateUrl: '../www/search.html',
				controller: 'GetDoctorsController',
				controllerAs: 'getDrCtrl',
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
			when('/doctor/:id', {
				templateUrl: '../www/doctor.html',
				//controller: 'ProfileCtrl',
			}).
			when('/doctor_sign_up', {
				templateUrl: '../www/doctor_sign_up.html',
			}).
			when('/doctor_sign_in', {
				templateUrl: '../www/doctor_sign_in.html',
			}).
			when('/doctor_dashboard/:id', {
				templateUrl: '../www/doctor_dashboard.html#personal',
			}).
			otherwise({
				redirectTo: '/404'
			});
	}]);



	//DATA
	//Include here hard-coded data
	

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
                           console.log("Paila, no se autenticó",data);
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, autenticado" + data);
                   }
       });
       this.data = {};
       };
	}]);

	var createDoctor = angular.module('createDoctor', []);
	createDoctor.controller('DoctorSignUpController', ['$http', '$scope', function($http, $scope){
		
		$scope.localidades = [
			{
				name: "Antonio Nariño", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Barrios Unidos", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Bosa", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Chapinero", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Ciudad Bolivar", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Engativá", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Fontibón", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Keneddy", lat: 4.5, lon: 74.5,	
			},
			{
				name: "La Candelaria", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Los Mártires", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Puente Aranda", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Rafael Uribe", lat: 4.5, lon: 74.5,	
			},
			{
				name: "San Cristóbal", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Santa Fe", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Suba", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Sumapaz", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Teusaquillo", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Tunjuelito", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Usaquén", lat: 4.5, lon: 74.5,	
			},
			{
				name: "Usme", lat: 4.5, lon: 74.5,	
			},
		];

		var type = "Doctor";
		this.signUp = function() {
				//console.log('Entra a signUp');
               var data1 = this.data;
               $http.post(endpoint + type + '/SignUp', data1)
               .success(function(data) {
                   if (!data.status) {
                        console.log("Paila, no se creó",data);
                        console.log(JSON.stringify(data1));
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, creado" + data);
                       console.log(JSON.stringify(data1));
                   }
       });
       this.data = {};
       };
	}]);

	//var loginDoctor = angular.module('loginDoctor', []);
	app.controller('DoctorSignInController', ['$http', '$routeParams', function($http, $routeParams){
		var type = "Doctor";
		this.signIn = function() {
				//console.log('Entra a signIn');
               var data1 = this.data;
               $http.post(endpoint + type + '/AuthenticateDoctor', data1)
               .success(function(data) {
                   if (!data.status) {
                           console.log("Paila, no se autenticó",data);
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, doctor autenticado", data.response);
                       var doc = data.response;
                       //console.log('la data es', doc);
                       window.location = "/#/doctor_dashboard/" + doc._id + "/#personal";
                   }
       });
       this.data = {};
       };
	}]);

	app.controller('GetDoctorsController', ['$http', '$routeParams', function($http, $routeParams){

		var docData = this;

		var city = $routeParams.city;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;

		docData.data1 = {};

		if(city !== "undefined") {
			docData.data1.city = city;
		}

		if(practice_list !== "undefined") {
			docData.data1.practice_list = practice_list;
		}

		if(insurance_list !== "undefined") {
			docData.data1.insurance_list = insurance_list;
		}

	}]);

	//SEARCH DOCTOR FROM LANDING PAGE
	app.controller('LandpageDocSearchController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

		this.docs = [];

		this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
		this.cities = [ {name: "Bogotá", id: 1}, {name: "Medellín", id: 2}, {name: "Cali", id: 3}, {name: "Barranquilla", id: 4}, {name: "Pereira", id: 5}, {name: "Bucaramanga", id: 6} ];
		this.insurances = [ {name: "Colpatria", id: 1}, {name: "Compensar", id: 2} ];

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

		var getPosition = function(list, option) {
			for(var i in list) {
				if(list[i].name === option) {
					return list[i];
				}
			}
		};

		this.selectedPractice = getPosition(this.practices, this.practice_list);
		this.selectedCity = getPosition(this.cities, this.city);
		this.selectedInsurance = getPosition(this.insurances, this.insurance_list);

		this.searchDoctor = function() {

			var selectedCity = !this.selectedCity ? "undefined" : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? "undefined" : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? "undefined" : this.selectedInsurance.name;

			window.location = "/#/search/" + selectedCity + "/" + selectedPractice + "/" + selectedInsurance;
       		//this.data = {};
       };

	}]);


	//GET DOCTOR BY SEARCH PARAMS --> to search page
	app.controller('DoctorSearchController', ['$http', '$scope', function($http, $scope){

		var docData = this;

		docData.city = $scope.getDrCtrl.data1.city;
		docData.practice = $scope.getDrCtrl.data1.practice_list;
		docData.insurance = $scope.getDrCtrl.data1.insurance_list;

		var getPosition = function(list, option) {
			for(var i in list) {
				if(list[i].name === option) {
					return list[i];
				}
			}
		};

		this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
		this.selectedPractice = getPosition(this.practices, docData.practice);
		
		this.cities = [ {name: "Bogotá", id: 1}, {name: "Medellín", id: 2}, {name: "Cali", id: 3}, {name: "Barranquilla", id: 4}, {name: "Pereira", id: 5}, {name: "Bucaramanga", id: 6} ];
		this.selectedCity = getPosition(this.cities, docData.city);
		
		this.insurances = [ {name: "Colpatria", id: 1}, {name: "Compensar", id: 2} ];
		this.selectedInsurance = getPosition(this.insurances, docData.insurance);

		this.searchDoctor = function() {

			var selectedCity = !this.selectedCity ? "undefined" : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? "undefined" : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? "undefined" : this.selectedInsurance.name;

			window.location = "/#/search/" + selectedCity + "/" + selectedPractice + "/" + selectedInsurance;
       		//this.data = {};
       };
	}]);


	//PROFILES LIST + MAP WITH DOCTORS LOCATIONS
	var mapView = angular.module('mapsApp', [])
	mapView.controller('MapCtrl', function ($scope, $http, $routeParams) {

		var docData = this;

		docData.docs = $scope.getDrCtrl.data1;

		console.log('Mi data es ',docData.docs);

		var This = this;

      	$http.post(endpoint + "Doctor" + '/GetDoctorsByParams', docData.docs)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
               		console.log(data);
               		alert('No se encontraron doctores con los criteros de búsqueda introducidos, vuelva a intentarlo');
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de doctores:");
               		console.log(data);

               		This.docs = data.response;

               		//console.log(JSON.stringify(this.docs));
           		}

	           	var mapOptions = {
					zoom: 1,
					center: new google.maps.LatLng(15.0000, -98.0000),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}

				$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

				$scope.markers = [];
				var infoWindow = new google.maps.InfoWindow();

				var createMarker = function (info){
					//console.log('ENTRA A CREAR MARKER');
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
						title: info.name +' '+ info.lastname
					});
					marker.content = '<div class="infoWindowContent"><img src="' + info.profile_pic + '" /><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';
					
					google.maps.event.addListener(marker, 'click', function(){
						infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
						infoWindow.open($scope.map, marker);
					});
					
					$scope.markers.push(marker);
				}

				for (i = 0; i < (data.response).length; i++){
					createMarker(This.docs[i]);
				}

				$scope.openInfoWindow = function(e, selectedMarker){
					e.preventDefault();
					google.maps.event.trigger(selectedMarker, 'click');
				}	

	    	});

	});


	var profileView = angular.module('docProfile', [])
	.controller('ProfileCtrl', function ($scope, $http, $routeParams) {

		//this.dProfile = {};

		var type = "Doctor";
		var id = $routeParams.id;
		console.log(id);

		var This = this;

		$http.get(endpoint + type + '/GetDoctorById/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontró un doctor con correo:", data);
           		} else {
               		// if successful, bind success message to message
               		console.log("El doctor encontrado es:");
               		console.log(data);

               		This.dProfile = data.response;
               		//console.log(JSON.stringify(dProfile.name));
           		}
	       		var mapOptions = {
					zoom: 2,
					center: new google.maps.LatLng(40.0000, -98.0000),
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}
			
				$scope.map = new google.maps.Map(document.getElementById('profile-map'), mapOptions);

				//$scope.markers = [];
				var infoWindow = new google.maps.InfoWindow();

				var createMarker = function (info){
					//console.log('ENTRA A CREAR MARKER');
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
						title: info.name +' '+ info.lastname
					});
					marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';
					
					google.maps.event.addListener(marker, 'click', function(){
						infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
						infoWindow.open($scope.map, marker);
					});
					
					//$scope.markers.push(marker);
				}

				createMarker(This.dProfile);
           	});
	});

	app.controller('DocDashboardController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){

		$scope.localidades = localidades;

		var id = $routeParams.id;

		var data1 = {};

		if(id !== "undefined") {
			data1.id = id;
		}

		this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];

		var doctorData = this;

		$http.get(endpoint + "Doctor" + '/GetDoctorById/' + data1.id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
               		console.log(data);
               		alert('No se encontraron doctores con los criteros de búsqueda introducidos, vuelva a intentarlo');
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de doctores:");
               		console.log(data);
               		//console.log(data.response.practice_list[0]);

               		this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
               		//console.log('ARRAY ', this.practices);
               		

					var getPosition = function(list, option) {
						for(var i in list) {
							if(list[i].name === option) {
								return list[i];
							}
						}
					};

					this.selectedPractice = getPosition(this.practices, data.response.practice_list[0]);



					console.log('la opcion seleccionada es '+this.selectedPractice.name);




               		doctorData.info = data.response;

               		console.log('practica', doctorData.info.practice_list[0]);

               		console.log(JSON.stringify(doctorData.info));
           		}
        	});

		var mapOptions = {
			zoom: 5,
			center: new google.maps.LatLng(4.28343, -74.22404),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		$scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);
      	
      	google.maps.event.trigger($scope.map, 'resize');

      	this.test = function() {
      		alert('sabeee');
      	};

      	this.updateDoctor = function() {
			//console.log('Entra a signUp');
			var type = "Doctor";
            var data1 = doctorData.info;
            console.log('Llega', data1);
            $http.post(endpoint + type + '/UpdateDoctor/' + data1._id, data1)
            .success(function(data) {
               if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
               } else {
                       // if successful, bind success message to message
                   console.log("Listo, doctor actualizado" + data);
                   console.log(JSON.stringify(data1));
                   this.data = data1;
                   return this.data;
               }
       });
       this.data = data1;
       };

	}]);

})();


