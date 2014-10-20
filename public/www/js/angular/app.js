(function(){

	var app = angular.module('doclinea', [
	  'ngRoute',
	  'mapsApp',
	  'loginUser',
	  'loginDoctor',
	  'createUser',
	  'createDoctor',
	  'docProfile',
	  'doctorDashboard',
	]);

	var endpoint = "http://192.241.187.135:1414/api_1.0/";
	//var endpoint = "http://192.168.1.109:1414/api_1.0/";
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
				templateUrl: '../www/doctor_dashboard.html',
				controller: 'DocDashboardController',
				controllerAs : 'docDashCtrl',
			}).
			otherwise({
				redirectTo: '/404'
			});
	}]);


	//DATA
	//Include here hard-coded data
	var localidades = [
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


	//GLOBAL DIRECTIVES
	app.directive('equals', function() {
	  return {
	    restrict: 'A', // only activate on element attribute
	    require: '?ngModel', // get a hold of NgModelController
	    link: function(scope, elem, attrs, ngModel) {
	      if(!ngModel) return; // do nothing if no ng-model

	      // watch own value and re-validate on change
	      scope.$watch(attrs.ngModel, function() {
	        validate();
	      });

	      // observe the other value and re-validate on change
	      attrs.$observe('equals', function (val) {
	        validate();
	      });

	      var validate = function() {
	        // values
	        var val1 = ngModel.$viewValue;
	        var val2 = attrs.equals;

	        // set validity
	        ngModel.$setValidity('equals', ! val1 || ! val2 || val1 === val2);
	      };
	    }
	  }
	});

	//ACCOUNTS AND AUTHENTICATION
	var createUser = angular.module('createUser', []);
	createUser.controller('SignUpController', ['$http',function($http){
		var type = "User";
		data1.password = btoa(data1.password);
        console.log('da password', data1.password);
		this.signUp = function() {
				//console.log('Entra a signUp');
               var data1 = this.data;
               $http.post(endpoint + type + '/Create', data1)
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
		data1.password = btoa(data1.password);
        console.log('da password', data1.password);
		this.signIn = function() {
				//console.log('Entra a signIn');
               var data1 = this.data;
               $http.post(endpoint + type + '/Authenticate', data1)
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
		
		$scope.localidades = localidades;

		var type = "Doctor";
		this.signUp = function() {
				//console.log('Entra a signUp');
               var data1 = this.data;
               data1.password = btoa(data1.password);
               //console.log('da password', data1.password);
               data1.password_verify = btoa(data1.password_verify);
               //console.log('da other password', data1.password_verify);
               $http.post(endpoint + type + '/Create', data1)
               .success(function(data) {
                   if (!data.status) {
                        console.log("Paila, no se creó",data);
                        console.log(JSON.stringify(data1));
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, creado" + data);
                       console.log(JSON.stringify(data1));
                       var doc = data.response;
                       //console.log('la data es', doc);
                       window.location = "/#/doctor_dashboard/" + doc._id;
                   }
       });
       this.data = {};
       };
	}]);

	var loginDoctor = angular.module('loginDoctor', []);
	loginDoctor.controller('DoctorSignInController', ['$http', '$routeParams', function($http, $routeParams){
		var type = "Doctor";
		this.signIn = function() {
				//console.log('Entra a signIn');
               var data1 = this.data;
               data1.password = btoa(data1.password);
               //console.log('da password', data1.password);
               data1.password_verify = btoa(data1.password_verify);
               //console.log('da other password', data1.password_verify);
               $http.post(endpoint + type + '/Authenticate', data1)
               .success(function(data) {
                   if (!data.status) {
                           console.log("Paila, no se autenticó",data);
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, doctor autenticado", data.response);
                       var doc = data.response;
                       //console.log('la data es', doc);
                       window.location = "/#/doctor_dashboard/" + doc._id;
                   }
       });
       this.data = {};
       };
	}]);


	app.controller('GetDoctorsController', ['$http', '$routeParams', function($http, $routeParams){

		var encodedParam = btoa("undefined");

		var docData = this;

		var city = $routeParams.city;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;

		// var encodedCity = btoa(city);
		// var encodedPractice = btoa(practice_list);
		// var encodedInsurance = btoa(insurance_list);

		docData.data1 = {};

		if(city !== encodedParam) {
			docData.data1.city = city;
		}

		if(practice_list !== encodedParam) {
			docData.data1.practice_list = practice_list;
		}

		if(insurance_list !== encodedParam) {
			docData.data1.insurance_list = insurance_list;
		}

	}]);


	//SEARCH DOCTOR FROM LANDING PAGE
	app.controller('LandpageDocSearchController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

		var encodedParam = btoa("undefined");

		this.docs = [];

		this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
		this.cities = [ {name: "Bogotá", id: 1}, {name: "Medellín", id: 2}, {name: "Cali", id: 3}, {name: "Barranquilla", id: 4}, {name: "Pereira", id: 5}, {name: "Bucaramanga", id: 6} ];
		this.insurances = [ {name: "Colpatria", id: 1}, {name: "Compensar", id: 2} ];

		var city = $routeParams.city;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;

		// var encodedCity = btoa(city);
		// var encodedPractice = btoa(practice_list);
		// var encodedInsurance = btoa(insurance_list);

		var data1 = {};

		if(city !== encodedParam) {
			data1.city = city;
		}

		if(practice_list !== encodedParam) {
			data1.practice_list = practice_list;
		}

		if(insurance_list !== encodedParam) {
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

			var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance.name;

			window.location = "/#/search/" + selectedCity + "/" + selectedPractice + "/" + selectedInsurance;
       		//this.data = {};
       };

	}]);


	//GET DOCTOR BY SEARCH PARAMS --> to search page
	app.controller('DoctorSearchController', ['$http', '$scope', function($http, $scope){

		var encodedParam = btoa("undefined");
		console.log(encodedParam);

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

			var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance.name;

			window.location = "/#/search/" + selectedCity + "/" + selectedPractice + "/" + selectedInsurance;
       };
	}]);


	//PROFILES LIST + MAP WITH DOCTORS LOCATIONS
	var mapView = angular.module('mapsApp', [])
	mapView.controller('MapCtrl', function ($scope, $http, $routeParams) {

		var docData = this;
		var type = "Doctor";

		docData.docs = $scope.getDrCtrl.data1;

		console.log('Mi data es ', docData);

		var This = this;

      	$http.post(endpoint + type + '/GetByParams', docData.docs)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
               		console.log(data);
               		$(".doc-box").css('visibility', 'hidden');
               		var not_found_msg = 'No se encontraron doctores con los criteros de búsqueda introducidos, vuelva a intentarlo.';
               		var alert_div = $("<div class=\"alert alert-danger alert-dismissible noty fade in\"  role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">x</span><span class=\"sr-only\"></span></button>"+not_found_msg+"</div>");
					$("body").prepend(alert_div);
					$(".alert").alert();
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

		var type = "Doctor";
		var id = $routeParams.id;
		//console.log(id);

		var This = this;

		$http.get(endpoint + type + '/GetById/' + id)
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


	//Module and Controllers for Doctor Dashboard
	docDash = angular.module('doctorDashboard', []);
	docDash.controller('DocDashboardController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = 'Doctor';

		$('#myTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		})

		$scope.localidades = localidades;
		var id = $routeParams.id;
		
		$scope.doctorData = this;

		$http.get(endpoint + type + '/GetById/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
               		console.log(data);
               		alert('No se encontraron doctores con los criteros de búsqueda introducidos, vuelva a intentarlo');
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de doctores:");
               		$scope.doctorData.info = data.response;
               		console.log($scope.doctorData.info);
           		}
        	});
	}]);

	//Controller for Pictures - Doctor
	docDash.directive('pictures', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/pictures.html',
	    	controller: 'DashboardPicturesController',
	    	controllerAs: 'dashPicturesCtrl',
	    };
	});
	docDash.directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);
	docDash.service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('image', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){
	        	console.log('se ha subido la imagen');
	        	var success_msg = 'Su foto de perfil ha sido guardada con éxito!';
           		var alert_div = $("<div class=\"alert success alert-info alert-dismissible noty fade in\"  role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"sr-only\"></span></button>"+success_msg+"</div>");
				$("body").prepend(alert_div);
				$(".alert").alert();
				setTimeout(function() {
				      alert_div.fadeOut(1800);
				}, 800);
	        })
	        .error(function(){
	        });
	    }
	}]);
	docDash.controller('DashboardPicturesController', ['$scope', 'fileUpload', function($scope, fileUpload){
		function readURL(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $('#profile-pic').attr('src', e.target.result);
	            }

	            reader.readAsDataURL(input.files[0]);
	        }
	    }

	    $("#image").change(function(){
	        readURL(this);
	    });

	    console.log('todo good!');

    	var type = 'Doctor';
	    $scope.uploadFile = function(doc_id){
	        var file = $scope.myFile;
	        console.log('file is ' + JSON.stringify(file));
	        var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	    };
	    
	}]);

	//Controller for change Password - Doctor
	docDash.directive('passwordChange', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/password_change.html',
	    	controller: 'DashboardPasswordController',
	    	controllerAs: 'dashPasswordCtrl',
	    };
	});
	docDash.controller('DashboardPersonalController', ['$http', '$scope',function($http, $scope){
		//$scope.doctorData.personalInfo = {};
		//var personalInfo = $scope.doctorData.personalInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
            $http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                }
      		});
       };
	}]);

	//Controller for Personal Info - Doctor
	docDash.directive('personal', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/personal.html',
	    	controller: 'DashboardPersonalController',
	    	controllerAs: 'dashPersonalCtrl',
	    };
	});
	docDash.controller('DashboardPersonalController', ['$http', '$scope',function($http, $scope){
		$scope.doctorData.personalInfo = {};
		var personalInfo = $scope.doctorData.personalInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			personalInfo.name = $scope.doctorData.info.name;
			personalInfo.lastname = $scope.doctorData.info.lastname;
			personalInfo.email = $scope.doctorData.info.email;
			personalInfo.gender = $scope.doctorData.info.gender;
			personalInfo.patient_gender = $scope.doctorData.info.patient_gender;
			personalInfo.phone = $scope.doctorData.info.phone;
			console.log(personalInfo);
			console.log(doc_id);
            //data1.education_list = {};
            //data1.education_list.institute_name = data1.institute_name;
            //delete data1.institute_name;
            //console.log('Llega', data1);
            $http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                }
      		 });
       //this.data = data1;
       };
	}]);

	//Controller for studies and working information
	docDash.directive('studies', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/studies.html',
	    	controller: 'DashboardStudiesController',
	    	controllerAs: 'dashStudiesCtrl',
	    };
	});
	docDash.controller('DashboardStudiesController', ['$http', '$scope',function($http, $scope){
		$scope.doctorData.studiesInfo = {};
		var studiesInfo = $scope.doctorData.studiesInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			studiesInfo.profesional_membership = $scope.doctorData.info.profesional_membership;
			studiesInfo.description = $scope.doctorData.info.description;
			console.log(studiesInfo);
			console.log(doc_id);
            //data1.education_list = {};
            //data1.education_list.institute_name = data1.institute_name;
            //delete data1.institute_name;
            //console.log('Llega', data1);
            $http.post(endpoint + type + '/Update/' + doc_id, studiesInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                }
      		 });
       //this.data = data1;
       };
	}]);

	//Controller for doctor locations
	docDash.directive('locations', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/locations.html',
	    	controller: 'DashboardLocationsController',
	    	controllerAs: 'dashLocationsCtrl',
	    };
	});
	docDash.controller('DashboardStudiesController', ['$http', '$scope',function($http, $scope){
		$scope.doctorData.locationsInfo = {};
		var locationsInfo = $scope.doctorData.locationsInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			locationsInfo.city = $scope.doctorData.info.city;
			console.log(locationsInfo);
			console.log(doc_id);
            //data1.education_list = {};
            //data1.education_list.institute_name = data1.institute_name;
            //delete data1.institute_name;
            //console.log('Llega', data1);
            $http.post(endpoint + type + '/Update/' + doc_id, locationsInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                }
      		 });
       //this.data = data1;
       };
	}]);

})();


