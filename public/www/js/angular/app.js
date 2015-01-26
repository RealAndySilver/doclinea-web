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
	  'userDashboard',
	  'adminDashboard',
	  'calendarPlugin',
	  'ui.calendar',
	  'ui.bootstrap',
	  'ui.modal',
	]);

	var endpoint = "http://192.241.187.135:1414/api_1.0/";
	//var endpoint = "http://192.168.0.37:1414/api_1.0/";
	app.config(['$routeProvider',
		function($routeProvider) {
		$routeProvider.
			when('/', {
				templateUrl: '../www/landpage.html',
			}).
			when('/search/:city/:localidad/:practice_list/:insurance_list', {
				templateUrl: '../www/search.html',
				controller: 'GetDoctorsController',
				controllerAs: 'getDrCtrl',
			}).
			when('/practices_list', {
				templateUrl: '../www/practices_list.html',
				//controller: 'SignUpController',
			}).
			when('/insurances_list', {
				templateUrl: '../www/insurances_list.html',
				//controller: 'SignUpController',
			}).
			when('/registration', {
				templateUrl: '../www/registration.html',
				//controller: 'SignUpController',
			}).
			when('/benefits', {
				templateUrl: '../www/benefits.html',
				//controller: 'SignUpController',
			}).
			when('/sign_up', {
				templateUrl: '../www/sign_up.html', 
				//controller: 'SignUpController',
			}).
			when('/sign_in', {
				templateUrl: '../www/sign_in.html',
				//controller: 'SignInController',
			}).
			when('/user/:id', {
				templateUrl: '../www/user.html',
				controller: 'UserDashboardController',
				controllerAs: 'userDashCtrl',
			}).
			when('/doctor/:id', {
				templateUrl: '../www/doctor.html',
				controller: 'ProfileCtrl',
				controllerAs : 'profile',
			}).
			when('/doctor_sign_up', {
				templateUrl: '../www/doctor_sign_up.html',
			}).
			when('/doctor_sign_in', {
				templateUrl: '../www/doctor_sign_in.html',
			}).
			when('/account_confirmation/:type/:email', {
				templateUrl: '../www/confirmation.html',
				controller: 'AccountConfirmationController',
				controllerAs : 'confirmCtrl',
			}).
			when('/account_activation/:type/:email', {
				templateUrl: '../www/confirmation.html',
				controller: 'AccountActivationController',
				controllerAs : 'activeCtrl',
			}).
			when('/password_recover/doctor', {
				templateUrl: '../www/password_recover.html',
				controller: 'PasswordRecoverController',
				controllerAs: 'recoverCtrl',
			}).
			when('/password_recover/user', {
				templateUrl: '../www/user_password_recover.html',
				controller: 'UserPasswordRecoverController',
				controllerAs: 'userRecoverCtrl',
			}).
			when('/NewPassword/:token/:type/new_password/:email', {
				templateUrl: '../www/new_password.html',
				controller: 'NewPasswordController',
				controllerAs: 'newPassCtrl',
			}).
			when('/doctor_dashboard/:id', {
				templateUrl: '../www/doctor_dashboard.html',
				controller: 'DocDashboardController',
				controllerAs : 'docDashCtrl',
			}).
			when('/admin_dashboard', {
				templateUrl: '../www/admin_dashboard.html',
				controller: 'AdminDashboardController',
				controllerAs : 'adminCtrl',
			}).
			when('/admin_dashboard/edit_doctor/:id', {
				templateUrl: '../www/doctors_management.html',
				controller: 'DoctorsManagementController',
				controllerAs : 'docManageCtrl',
			}).
			when('/admin_dashboard/edit_hospital/:id', {
				templateUrl: '../www/hospitals_management.html',
				controller: 'HospitalsManagementController',
				controllerAs : 'hospitalManageCtrl',
			}).
			when('/admin_dashboard/edit_insurance/:id', {
				templateUrl: '../www/insurances_management.html',
				controller: 'InsurancesManagementController',
				controllerAs : 'insuranceManageCtrl',
			}).
			when('/admin_dashboard/edit_practice/:id', {
				templateUrl: '../www/practices_management.html',
				controller: 'PracticesManagementController',
				controllerAs : 'practiceManageCtrl',
			}).
			otherwise({
				redirectTo: '/404'
			});
	}]);


	//DATA
	//Global data (practices)
	//Hardcoded data (Cities, Practices)
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

	var PracticesService = function($http) {
		var self = this;

		self.getAll = function() {
			var type = "Practice";
			return $http({
				method: 'GET',
				url: endpoint + type + '/GetAll',
			});
		};
	};
	app.service('PracticesService', ['$http', PracticesService]);

	var InsurancesService = function($http) {
		var self = this;

		self.getAll = function() {
			var type = "InsuranceCompany";
			return $http({
				method: 'GET',
				url: endpoint + type + '/GetAll',
			});
		};
	};
	app.service('InsurancesService', ['$http', InsurancesService]);

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
	createUser.controller('SignUpController', ['$http', '$scope', function($http, $scope){
		var type = "User";
		this.signUp = function() {
				//console.log('Entra a signUp');
				var data1 = this.data;
                data1.password = btoa(data1.password);
                data1.birthday = data1.birthday.getTime();
                $http.post(endpoint + type + '/Create', data1)
                .success(function(data) {
                   if (!data.status) {
                           //console.log("No se pudo crear usuario",data);
                        swal({  
							title: "", 
							text: "Ha ocurrido un error, por favor inténtalo nuevamente.",   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
                   } else {
                           // if successful, bind success message to message
                       console.log("Listo, creado usuario" + data);
                       var user = data.response;
                       var type = "user";
	                   var email = btoa(user.email);
	                   //console.log('la data es', user);
	                   // window.location = "/#/user/" + user._id;
	                   window.location = "/#/account_confirmation/" + type + "/" + email;
                   }
       });
       //this.data = {};
       };
	}]);

	var login = angular.module('loginUser', []);
	login.controller('SignInController', ['$http', 'User', function($http, User){
		var type = "User";
		this.signIn = function() {
				//console.log('Entra a signIn');
				var data1 = this.data;
                data1.password = btoa(data1.password);
                $http.post(endpoint + type + '/Authenticate', data1)
                .success(function(data) {
                   if (!data.status) {
                           console.log("No se autenticó", data);
                           var auth_error = data.error;
							if(data.error_id == 0) {
								swal({  
									title: "", 
									text: "Email o contraseña incorrectos.",   
									type: "error",   
									confirmButtonText: "Aceptar",
								});
							} else if(data.error_id == 1) {
								swal({  
									title: "", 
									text: "Debes activar primero tu cuenta.",   
									type: "error",   
									confirmButtonText: "Aceptar",
								});
							} else {
								swal({  
									title: "", 
									text: "Ha ocurrido un error, por favor inténtalo nuevamente.",   
									type: "error",   
									confirmButtonText: "Aceptar",
								});
							}
                   } else {
                           // if successful, bind success message to message
                       // console.log("Listo, autenticado" + data);
                       var user = data.response;
	                   //console.log('la data es', user);
	                   window.location = "/#/user/" + user._id

	                   User.username = user.name;
	                   User.isDoctor = false;
	                   User.id = user._id;
	                   User.gender = user.gender;

	                   console.log('Mi objeto USUARIO es', User);

	                   // Store
					   localStorage.setItem('user', JSON.stringify(User));

					   // $scope.userData = JSON.parse(localStorage.user);
					   // console.log('Nombre de Usuario guardado', $scope.userData.username);
                   }
       });
       this.data = {};
       };
	}]);

	var createDoctor = angular.module('createDoctor', []);
	createDoctor.controller('DoctorSignUpController', ['$http', '$scope', 'PracticesService', '$location', '$anchorScroll', function($http, $scope, PracticesService, $location, $anchorScroll){
		$location.hash('doctor-sign-up-box');
		$anchorScroll();
		
		$scope.localidades = localidades;

		this.practices = [];

		var self = this;

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			console.log(response.data);
			self.practices = response.data.response;
		});

		var type = "Doctor";
		this.signUp = function() {
				//console.log('Entra a signUp');
               var data1 = this.data;
               data1.password = btoa(data1.password);
               data1.password_verify = btoa(data1.password_verify);
               data1.practice_list = data1.practice_list.name;
               data1.birthday = data1.birthday.getTime();
               console.log(data1); 
               $http.post(endpoint + type + '/Create', data1)
	               .success(function(data) {
	                   if (!data.status) {
	                        console.log("Paila, no se creó",data);
	                        //console.log(JSON.stringify(data1));
	                        swal({  
								title: "", 
								text: "Ha ocurrido un error, por favor inténtalo nuevamente.",   
								type: "error",   
								confirmButtonText: "Aceptar",
							});
	                   } else {
	                           // if successful, bind success message to message
	                       console.log("Listo, creado" + data);
	                       console.log(JSON.stringify(data1));
	                       var doc = data.response;
	                       var type = "doctor";
	                       var email = btoa(doc.email);
	                       //console.log('la data es', doc);
	                       // window.location = "/#/doctor_dashboard/" + doc._id;
	                       window.location = "/#/account_confirmation/" + type + "/" + email;
	                   }
	        		});
        this.data = {};
        };
	}]);

	var loginDoctor = angular.module('loginDoctor', []);
	loginDoctor.controller('DoctorSignInController', ['$http', '$scope', '$routeParams', '$location', '$anchorScroll', 'User', function($http, $scope, $routeParams, $location, $anchorScroll, User){
		var type = "Doctor";
		
		$location.hash('doctor-sign-in-box');
		$anchorScroll();

		this.signIn = function() {
			//console.log('Entra a signIn');
           var data1 = this.data;
           data1.password = btoa(data1.password);
           // data1.password_verify = btoa(data1.password_verify);
           $http.post(endpoint + type + '/Authenticate', data1)
	           .success(function(data) {
	               if (!data.status) {
                        console.log("Paila, no se autenticó",data);
                        var auth_error = data.error;
	               		if(data.error_id == 0) {
								swal({  
									title: "", 
									text: "Email o contraseña incorrectos.",   
									type: "error",   
									confirmButtonText: "Aceptar",
								});
							} else if(data.error_id == 1) {
								swal({  
									title: "", 
									text: "Debes activar primero tu cuenta.",   
									type: "error",   
									confirmButtonText: "Aceptar",
								});
							} else {
								swal({  
									title: "", 
									text: "Ha ocurrido un error, por favor inténtalo nuevamente.",   
									type: "error",   
									confirmButtonText: "Aceptar",
								});
							}
	               } else {
	                       // if successful, bind success message to message
	                   console.log("Listo, doctor autenticado", data.response);
	                   var doc = data.response;
	                   //console.log('la data es', doc);
	                   window.location = "/#/doctor_dashboard/" + doc._id;

	                   User.username = doc.name;
	                   User.id = doc._id;
	                   User.isDoctor = true;
	               }
	       		});
       this.data = {};
       };
	}]);

	app.controller('LoginWelcomeController', ['$scope', '$http', 'UserService', function($scope, $http, UserService){
		var status = 0;
		if(status == 0) {
			console.log('No existe una sesión activa');
		}

		var self = this;

		$scope.$watch(UserService.getUser(), function() {
			self.getStatus();
		});

		this.getStatus = function() {
			var user = UserService.getUser();
			var username = user.username;

			if(username) {
				if(user.isDoctor) {
					return 2;
				} else {
					return 1;
				}
			}
			return 0;
		};

		this.logout = function() {
			location.reload();
			window.location = "/#";
		};

		this.getUsername = function() {
			return UserService.getUser().username;
		};
		this.getUserId = function() {
			return UserService.getUser().id;
		}

		// Store
		//localStorage.user = JSON.stringify(User);
		//console.log('Info guardada!', localStorage.user)

		//var userData = JSON.parse(localStorage.user);
	    //console.log('Nombre de Usuario guardado', JSON.parse(localStorage.user));

	}]);

	app.value('User', {
		username: '',
		isDoctor: false,
		id: '',
		gender: '',
	});

	app.service('UserService', ['User', function(User) {
		this.getUser = function() {
			return User;	
		};
	}]);

	//Controller for Modal.js
	var modalView = angular.module('ui.modal', [])
	modalView.controller('ModalCtrl', function ($scope, $modal) {

		$scope.openUser = function (size) {

		    var modalUser = $modal.open({
		      templateUrl: '../www/user_password_recover.html',
		      controller: 'UserPasswordRecoverController',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		};

		$scope.openDoctor = function(size) {

			var modalDoctor = $modal.open({
		      templateUrl: '../www/password_recover.html',
		      controller: 'PasswordRecoverController',
		      size: size,
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });
		};

	});

	//Controllers for Password Recovering
	app.controller('PasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope){
		//console.log('Entra a recover');
		$scope.docRecover = function() {
			var email = this.recoverCtrl.data.email;
			console.log(email);
			$http.get(endpoint + 'Doctor' + '/Recover/' + email)
	            .success(function(data) {
	                if (!data.status) {
	                    console.log("El correo no existe o no pudo ser enviado", data);
	                    var email_error = 'Correo electrónico no encontrado.';
						swal({  
							title: "", 
							text: email_error,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
						$("#doctor-recover-password #email").val('');
	                } else {
	                       // if successful, bind success message to message
	                   //console.log("Ha sido enviado el correo" + data);
	                   var success_msg = 'Tu solicitud ha sido enviada con éxito!';
						swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
							//timer: 800,
						});
	                }
	    		});
	    	$modalInstance.close();
		};
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}]);
	app.controller('UserPasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope){
		//console.log('Entra a recover');
		$scope.userRecover = function() {
			var email = this.userRecoverCtrl.data.email;
			console.log(email);
			$http.get(endpoint + 'User' + '/Recover/' + email)
	            .success(function(data) {
	                if (!data.status) {
	                    console.log("El correo no existe o no pudo ser enviado", data);
	                    var email_error = 'Correo electrónico no encontrado.';
	               		swal({  
							title: "", 
							text: email_error,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
						$("#user-recover-password #email").val('');
	                } else {
	                       // if successful, bind success message to message
	                   //console.log("Ha sido enviado el correo" + data);
	                   var success_msg = 'Tu solicitud ha sido enviada con éxito!';
		           		swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
							//timer: 800,
						});
	                }
	    		});
	    	$modalInstance.close();
		};
		$scope.cancel = function() {
			$modalInstance.dismiss('cancel');
		};
	}]);
	app.controller('NewPasswordController', ['$http', '$routeParams', function($http, $routeParams){
		console.log('Entra a new password');

		var token = $routeParams.token;
		var type = $routeParams.type;
		var email = $routeParams.email;
		console.log(token, type, email);

		this.sendPassword = function() {
			var data1 = this.data;
			data1.password = btoa(data1.password);
            //data1.password_verify = btoa(data1.password_verify);
			//console.log(data1.password);
			if (type == 'doctor') {
				type = 'Doctor';
			};
			if (type == 'user') {
				type = 'User';
			};
			$http.post(endpoint + type + '/NewPassword/' + token, data1)
	            .success(function(data) {
	                if (!data.status) {
	                    //console.log("El correo no existe o no pudo ser enviado", data);
	                    var send_error = 'Ha ocurrido un error, verifica la contraseña de nuevo.';
	               		swal({  
							title: "", 
							text: send_error,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
						//$("#doctor-recover-password #email").val('');
	                } else {
	                       // if successful, bind success message to message
	                   //console.log("Ha sido enviado el correo" + data);
	                   var success_msg = 'Tu solicitud ha sido enviada con éxito!';
		           		swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
							//timer: 800,
						});
	                }
	    		});
	    	window.location = "/#/";
		};
	}]);

	//Controller for Account Confirmation
	app.controller('AccountConfirmationController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){

		var type = $routeParams.type;
		var email = $routeParams.email;
		console.log(type, email);

		data1 = {};
		data1.email = atob(email);
		console.log(data1);

		this.sendEmailVerification = function() {
			//console.log('enviando correo...');
			$http.post(endpoint + "Account" + '/SendEmailVerification/' + type + "/" + email, data1)
	            .success(function(data) {
	                if (!data.status) {
	                    console.log("El correo no puede ser reenviado", data);
	                    var send_error = 'El correo no puede ser reenviado.';
	               		swal({  
							title: "", 
							text: send_error,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	                } else {
	                       // if successful, bind success message to message
	                   //console.log("Ha sido enviado el correo" + data);
	                   var success_msg = 'Tu solicitud ha sido enviada con éxito!';
		           		swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
							//timer: 800,
						});
	                }
	    		});
		};
	}]);

	//Controller for Account Activation
	app.controller('AccountActivationController', ['$http', '$routeParams', '$scope', function($http, $routeParams, $scope){
		$scope.type = $routeParams.type;
		console.log($scope.type);
	}]);

	//Parent Controller for Doctors Searching
	app.controller('GetDoctorsController', ['$http', '$routeParams', function($http, $routeParams){

		var encodedParam = btoa("undefined");

		var docData = this;

		var city = $routeParams.city;
		var localidad = $routeParams.localidad;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;

		docData.data1 = {};
		docData.data1.localidad = {};

		if(city !== encodedParam) {
			docData.data1.city = city;
		}

		if(practice_list !== encodedParam) {
			docData.data1.practice_list = practice_list;
		}

		if(insurance_list !== encodedParam) {
			docData.data1.insurance_list = insurance_list;
		}

		if(localidad !== encodedParam) {
			docData.data1.localidad.name = localidad;
		}

	}]);


	//SEARCH DOCTOR FROM LANDING PAGE
	app.controller('SearchListsController', ['$http', '$scope', 'PracticesService', 'InsurancesService', function($http, $scope, PracticesService, InsurancesService){
		$scope.encodedParam = btoa("undefined");

		this.practices = [];
		this.insurances = [];
		this.localidades = localidades;

		var self = this;

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			//console.log(response.data);
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			//console.log(response.data);
			self.insurances = response.data.response;
		});
	}]);

	app.controller('LandpageDocSearchController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService) {
		//console.log(localidades);

		var encodedParam = btoa("undefined");

		this.docs = [];
		this.practices = [];
		this.insurances = [];
		this.localidades = localidades;
		//console.log(this.localidades);

		var self = this;

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			//console.log(response.data);
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			//console.log(response.data);
			self.insurances = response.data.response;
		});

		// this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
		this.cities = [ {name: "Bogotá", id: 1}, {name: "Medellín", id: 2}, {name: "Cali", id: 3}, {name: "Barranquilla", id: 4}, {name: "Pereira", id: 5}, {name: "Bucaramanga", id: 6} ];
		//this.insurances = [ {name: "Colpatria", id: 1}, {name: "Compensar", id: 2} ];

		var city = $routeParams.city;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;
		var localidad = $routeParams.localidad;

		var data1 = {};
		data1.localidad = {};

		if(city !== encodedParam) {
			data1.city = city;
		}

		if(practice_list !== encodedParam) {
			data1.practice_list = practice_list;
		}

		if(insurance_list !== encodedParam) {
			data1.insurance_list = insurance_list;
		}

		if(localidad !== encodedParam) {
			data1.localidad.name = localidad;
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
		this.selectedLocalidad = getPosition(this.localidades, this.localidad);

		this.searchDoctor = function() {
			var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance.name;
			var selectedLocalidad = !this.selectedLocalidad ? encodedParam : this.selectedLocalidad.name;

			window.location = "/#/search/" + selectedCity + "/" + selectedLocalidad + "/" + selectedPractice + "/" + selectedInsurance;
       		//this.data = {};
       };

	}]);


	//GET DOCTOR BY SEARCH PARAMS --> to search page
	app.controller('DoctorSearchController', ['$http', '$scope', 'PracticesService', 'InsurancesService', function($http, $scope, PracticesService, InsurancesService){

		var encodedParam = btoa("undefined");
		console.log(encodedParam);

		var docData = this;
		this.practices = [];
		this.insurances = [];
		this.localidades = localidades;
		//console.log(this.localidades);

		var self = this;

		docData.city = $scope.getDrCtrl.data1.city;
		docData.practice = $scope.getDrCtrl.data1.practice_list;
		docData.insurance = $scope.getDrCtrl.data1.insurance_list;
		docData.localidad = $scope.getDrCtrl.data1.localidad;

		var getPosition = function(list, option) {
			for(var i in list) {
				if(list[i].name === option) {
					return list[i];
				}
			}
		};

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			//console.log(response.data);
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			//console.log(response.data);
			self.insurances = response.data.response;
		});

		// this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
		this.selectedPractice = getPosition(this.practices, docData.practice);
		
		this.cities = [ {name: "Bogotá", id: 1}, {name: "Medellín", id: 2}, {name: "Cali", id: 3}, {name: "Barranquilla", id: 4}, {name: "Pereira", id: 5}, {name: "Bucaramanga", id: 6} ];
		this.selectedCity = getPosition(this.cities, docData.city);
		
		//this.insurances = [ {name: "Colpatria", id: 1}, {name: "Compensar", id: 2} ];
		this.selectedInsurance = getPosition(this.insurances, docData.insurance);

		this.selectedLocalidad = getPosition(this.localidades, docData.localidad.name);

		console.log('CIUDAD SELECCIONADA');
		console.log(docData.city);

		this.searchDoctor = function() {

			var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance.name;
			var selectedLocalidad = !this.selectedLocalidad ? encodedParam : this.selectedLocalidad.name;

			window.location = "/#/search/" + selectedCity + "/" + selectedLocalidad + "/" + selectedPractice + "/" + selectedInsurance;
       };
	}]);


	//PROFILES LIST + MAP WITH DOCTORS LOCATIONS
	var mapView = angular.module('mapsApp', [])
	mapView.controller('MapCtrl', function ($scope, $http, $routeParams) {

		var docData = this;
		var type = "Doctor";

		docData.docs = $scope.getDrCtrl.data1;

		console.log('Mi data es ', docData.docs);

		var This = this;

		$('#doc-search-box').show();
      	$http.post(endpoint + type + '/GetByParams', docData.docs)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
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

				var createMarker = function (info){
					//console.log('ENTRA A CREAR MARKER');
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
						title: info.name +' '+ info.lastname
					});
					marker.content = '<div class="infoWindowContent"><img src="' + info.profile_pic.image_url + '" width="60px" /><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.location_list[0].location_address + '</h4><br><a href="#/" class="btn btn-success btn-sm">Pedir cita</a></div></div>';
					
					google.maps.event.addListener(marker, 'click', function(){
						infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
						infoWindow.open($scope.map, marker);
					});
					
					$scope.markers.push(marker);
				}

				for (i = 0; i < (This.docs).length; i++){
					createMarker(This.docs[i]);
					// console.log('MIS DOCTORES ENCONTRADOS');
					// console.log(This.docs[i]);
				}

				$scope.openInfoWindow = function(e, selectedMarker){
					e.preventDefault();
					google.maps.event.trigger(selectedMarker, 'click');
				}	

	    	});

	});

	//Controller for Doctor Profile
	var profileView = angular.module('docProfile', [])
	.controller('ProfileCtrl', function ($scope, $http, $routeParams) {

		var type = "Doctor";
		var id = $routeParams.id;
		//console.log(id);
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

				var createMarker = function (info){
					//console.log('ENTRA A CREAR MARKER');
					var marker = new google.maps.Marker({
						map: $scope.map,
						position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
						title: info.name +' '+ info.lastname
					});
					marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.location_list[0].location_address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';
					
					google.maps.event.addListener(marker, 'click', function(){
						infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
						infoWindow.open($scope.map, marker);
					});
					
					//$scope.markers.push(marker);
				}

				createMarker(This.dProfile);
				$scope.encodedParam = btoa("undefined");
           	});
	});

	//Module and Controllers for User Dashboard - PARENT CONTROLLER
	userDash = angular.module('userDashboard', []);
	userDash.controller('UserDashboardController', ['$http', '$scope', '$routeParams', 'InsurancesService', function($http, $scope, $routeParams, InsurancesService){
		var type = 'User';

		$('#user-tab a, #myTab a').click(function (e) {
		    e.preventDefault();
		    $(this).tab('show');
		});

		var id = $routeParams.id;

		$scope.userData = this;

		//this.insurances = [];

		var self = this;

		// var promiseGetAllInsurances = InsurancesService.getAll();
		// promiseGetAllInsurances.then(function(response) {
		// 	console.log(response.data);
		// 	self.insurances = response.data.response;
		// });

		$http.get(endpoint + type + '/GetByID/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron usuarios",data.error);
               		console.log(data);
               		swal({  
						title: "Error de Servidor", 
						text: "Ha ocurrido un error al cargar la información del usuario.",   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de usuarios:");
               		$scope.userData.info = data.response;
               		console.log($scope.userData.info);
           		}
        	});
	}]);
	//Controller for Personal Info - User
	userDash.directive('personalUser', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/user/personal.html',
	    	controller: 'UserInfoController',
	    	controllerAs: 'userInfoCtrl',
	    };
	});
	userDash.controller('UserInfoController', ['$http', '$scope',function($http, $scope){
		$scope.userData.personalInfo = {};
		var personalInfo = $scope.userData.personalInfo;

		this.updateUser = function(user_id) {
			var type = 'User';
			
			personalInfo.name = $scope.userData.info.name;
			personalInfo.lastname = $scope.userData.info.lastname;
			personalInfo.email = $scope.userData.info.email;
			personalInfo.birthday = $scope.userData.info.birthday.getTime();
			personalInfo.gender = $scope.userData.info.gender;
			personalInfo.phone = $scope.userData.info.phone;
			personalInfo.city = $scope.userData.info.city;
			personalInfo.address = $scope.userData.info.address;
			//personalInfo.insurance = $scope.userData.info.insurance.name;
			console.log(personalInfo);
			console.log(user_id);

            $http.post(endpoint + type + '/Update/' + user_id, personalInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                    var error_msg = 'No se pudieron actualizar tus datos personales, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, usuario actualizado", data.response);
                    var success_msg = 'Tus datos personales han sido actualizados con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };

	}]);
	userDash.directive('passwordChangeUser', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/user/password_change.html',
	    	controller: 'UserPasswordController',
	    	controllerAs: 'userPassCtrl',
	    };
	});
	userDash.controller('UserPasswordController', ['$http', '$scope',function($http, $scope){
		$scope.userData.security = {};
		var securityInfo = $scope.userData.security;

		this.updateUser = function(user_id) {
			var type = 'User';

			securityInfo.password = btoa($scope.security.password);
			securityInfo.new_password = btoa($scope.security.new_password);
			
            $http.post(endpoint + type + '/ChangePassword/' + user_id, securityInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                    var error_msg = 'No se pudo actualizar tu contraseña, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, usuario actualizado", data.response);
                   var success_msg = 'Tu contraseña ha sido cambiada con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };
	}]);
	userDash.directive('userSettings', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/user/settings.html',
	    	controller: 'UserSettingsController',
	    	controllerAs: 'settingsCtrl',
	    };
	});
	userDash.controller('UserSettingsController', ['$http', '$scope',function($http, $scope){
		//console.log('entra a settings');
		$scope.userData.settingsInfo = {};
		var settingsInfo = $scope.userData.settingsInfo;

		this.updateUser = function(user_id) {
			var type = 'User';
			
			settingsInfo.settings = {};
			//settingsInfo.settings = $scope.userData.info.settings;
			
			settingsInfo.settings.email_appointment_notifications = $scope.userData.info.settings.email_appointment_notifications;
			if (settingsInfo.settings.email_appointment_notifications == undefined) {
				settingsInfo.settings.email_appointment_notifications = false;
			};
			settingsInfo.settings.email_marketing_notifications = $scope.userData.info.settings.email_marketing_notifications;
			if (settingsInfo.settings.email_marketing_notifications == undefined) {
				settingsInfo.settings.email_marketing_notifications = false;
			};
			settingsInfo.settings.mobile_appointment_notifications = $scope.userData.info.settings.mobile_appointment_notifications;
			if (settingsInfo.settings.mobile_appointment_notifications == undefined) {
				settingsInfo.settings.mobile_appointment_notifications = false;
			};
			settingsInfo.settings.mobile_marketing_notifications = $scope.userData.info.settings.mobile_marketing_notifications;
			if (settingsInfo.settings.mobile_marketing_notifications == undefined) {
				settingsInfo.settings.mobile_marketing_notifications = false;
			};			
			console.log(settingsInfo);
			
            $http.post(endpoint + type + '/Update/' + user_id, settingsInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                    var error_msg = 'No se pudieron actualizar tus notificaciones, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, usuario actualizado", data.response);
                   var success_msg = 'Tus notificaciones han sido actualizadas con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };
	}]);

	
	///////////////////////////////////////////////////////////////////
	//Module and Controllers for Doctor Dashboard - PARENT CONTROLLER//
	///////////////////////////////////////////////////////////////////
	docDash = angular.module('doctorDashboard', ['calendarPlugin']);
	docDash.controller('DocDashboardController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService){
		var type = 'Doctor';

		$('#doc-tab a, #account-tab a').click(function (e) {
		    e.preventDefault();
		    $(this).tab('show');
		});

		$('#doc-tab a[href="#/doctor_dashboard/{{docDashCtrl.info._id}}/#appointments"]').on('shown.bs.tab', function (e) {
		    e.preventDefault();
		    $(this).tab('show');
		    $('#set-week').trigger("click");
		});

		$('#account-tab a[href="#/doctor_dashboard/{{docDashCtrl.info._id}}/#locations"]').on('shown.bs.tab', function (e) {
		    e.preventDefault();
		    var mapOptions = {
				zoom: 11,
				center: new google.maps.LatLng(4.6777333, -74.0956373),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			var initialMarker = [];
			$scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

			google.maps.event.addListener($scope.map, 'click', addPoint);

			//cargar ubicación en mapa
			var createMarker = function (lat, lng){
				console.log('ENTRA A CREAR MARKER');
				var marker = new google.maps.Marker({
					map: $scope.map,
					position: new google.maps.LatLng(lat, lng),
					//title: info.name +' '+ info.lastname
				});
				initialMarker.push(marker);
				// marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';
				
				// google.maps.event.addListener(marker, 'click', function(){
				// 	infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
				// 	infoWindow.open($scope.map, marker);
				// });
			}
			doctorLat = $scope.doctorData.info.location_list[0].lat;
			doctorLon = $scope.doctorData.info.location_list[0].lon;
			createMarker(doctorLat, doctorLon);

		    //añadir ubicación a mapa
			function addPoint(event) { 
			    var marker = new google.maps.Marker({
			        position: event.latLng,
			        map: $scope.map,
			        //draggable: true
			    });
			    var markers = [];
		    	markers.push(marker);
		    	$scope.lat = event.latLng.lat();
			    $scope.lng = event.latLng.lng();
			    console.log($scope.doctorData.info.location_list);
			    if ($scope.doctorData.info.location_list[0].lat && $scope.doctorData.info.location_list[0].lon) {
			    	initialMarker[0].setMap(null);
			    };
			    google.maps.event.addListener($scope.map, 'click', function() {
		    		marker.setMap(null);
			        for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
			        markers.splice(i, 1);
			    });
			}

		});

		this.practices = [];
		this.insurances = [];

		var self = this;

		$scope.localidades = localidades;
		
		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			console.log(response.data);
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			console.log(response.data);
			self.insurances = response.data.response;
		});

		var myDate = new Date();
		var currentYear = myDate.getFullYear();
		this.yearsList = [];
		var loadYears = function() {
			for (var i = 0; i < ((currentYear+1)-1950); i++) {
				self.yearsList[i] = 1950+i;
			};
			return self.yearsList;
		}
		loadYears();

		$scope.cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Pereira", "Bucaramanga"];

		var id = $routeParams.id;
		
		$scope.doctorData = this;

		$http.get(endpoint + type + '/GetByID/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
               		console.log(data);
               		swal({  
						title: "Error de Servidor", 
						text: "Ha ocurrido un error al cargar la información del doctor.",   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de doctores:");
               		$scope.doctorData.info = data.response;
               		console.log($scope.doctorData.info);

               		if ($scope.doctorData.info.education_list.length == 0) {
               			$scope.doctorData.info.education_list.push({institute_name: '', degree: '', year_start: '', year_end: '', hilights: ''});
               		};
               		if ($scope.doctorData.info.education_list[0] == null || $scope.doctorData.info.education_list[0] == 0) {
               			$scope.doctorData.info.education_list[0] = {institute_name: '', degree: '', year_start: '', year_end: '', hilights: ''};
               		};
               		if ($scope.doctorData.info.profesional_membership.length == 0) {
               			$scope.doctorData.info.profesional_membership.push('');
               		};
               		if ($scope.doctorData.info.profesional_membership[0] == null) {
               			$scope.doctorData.info.profesional_membership[0] = '';
               		};
               		if ($scope.doctorData.info.description == 'undefined') {
               			$scope.doctorData.info.description = '';
               		};
               		if ($scope.doctorData.info.description == null) {
               			$scope.doctorData.info.description = '';
               		};
               		if ($scope.doctorData.info.location_list.length == 0) {
               			$scope.doctorData.info.location_list.push({location_name: '', location_address: '', lat: '', lon: ''});
               		};
               		if ($scope.doctorData.info.location_list[0] == null) {
               			$scope.doctorData.info.location_list[0] = {location_name: '', location_address: '', lat: '', lon: ''};
               		};
               		if ($scope.doctorData.info.insurance_list.length == 0) {
               			$scope.doctorData.info.insurance_list.push({insurance: ''});
               		};
               		if ($scope.doctorData.info.insurance_list[0] == null) {
               			$scope.doctorData.info.insurance_list[0] = {insurance: ''};
               		};
               		// if ($scope.doctorData.info.gallery.length == 0) {
               		// 	$scope.doctorData.info.gallery.push({name: '', image_url: ''});
               		// };
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
	        	var success_msg = 'Tu foto de perfil ha sido actualizada con éxito.';
           		swal({  
					title: "", 
					text: success_msg,   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
	        })
	        .error(function(){
	        	var error_msg = 'No se pudo actualizar tu foto de perfil, verifica la información de nuevo.';
           		swal({  
					title: "", 
					text: error_msg,   
					type: "error",   
					confirmButtonText: "Aceptar",
				});
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

    	var type = 'Doctor';
	    $scope.uploadFile = function(doc_id){
	        var file = $scope.myFile;
	        console.log('file is ' + JSON.stringify(file));
	        var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	    };
	    
	}]);

	//Controller for change Password - Doctor     -->changePassword/id  password, new_password
	docDash.directive('passwordChange', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/password_change.html',
	    	controller: 'DashboardPasswordController',
	    	controllerAs: 'dashPasswordCtrl',
	    };
	});
	docDash.controller('DashboardPasswordController', ['$http', '$scope',function($http, $scope){
		$scope.doctorData.security = {};
		var securityInfo = $scope.doctorData.security;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';

			securityInfo.password = btoa($scope.security.password);
			securityInfo.new_password = btoa($scope.security.new_password);
			
            $http.post(endpoint + type + '/ChangePassword/' + doc_id, securityInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo actualizar tu contraseña, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                   var success_msg = 'Tu contraseña ha sido cambiada con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
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
			personalInfo.secondary_email = $scope.doctorData.info.secondary_email;
			if (personalInfo.birthday == 'undefined') {
				personalInfo.birthday = $scope.doctorData.info.birthday.getTime();
			};
			personalInfo.gender = $scope.doctorData.info.gender;
			personalInfo.patient_gender = $scope.doctorData.info.patient_gender;
			personalInfo.address = $scope.doctorData.info.address;
			personalInfo.phone = $scope.doctorData.info.phone;
			console.log(personalInfo);
			console.log(doc_id);

            $http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudieron actualizar tus datos personales, verifica la información de nuevo.';
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data.response);
	           		var success_msg = 'Tus datos personales han sido actualizados con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
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

		//var practices = $scope.practices;

		//add or remove practice form fields
		this.addPractice = function() {
			//console.log($scope.doctorData.info.practice_list[0]);
			$scope.doctorData.info.practice_list.push('');
		};
		this.removePractice = function(practiceToRemove) {
			var index = $scope.selectedPracticeList.indexOf(practiceToRemove);
			$scope.doctorData.info.practice_list.splice(index, 1);
			$scope.selectedPracticeList.splice(index, 1);
		};
		this.addStudiesInfo = function() {
			$scope.doctorData.info.education_list.push({institute_name: '', degree: '', year_start: '', year_end: '', hilights: ''});
		};
		this.removeStudiesInfo = function(studiesToRemove) {
			var index = $scope.doctorData.info.education_list.indexOf(studiesToRemove);
			$scope.doctorData.info.education_list.splice(index, 1);
		};
		this.initStudiesInfo = function() {
			var studies = $scope.doctorData.info.education_list;
		};
		this.addInsurance = function() {
			//console.log($scope.doctorData.info.insurance_list[0]);
			$scope.doctorData.info.insurance_list.push({insurance: ''});
		};
		this.removeInsurance = function(insuranceToRemove) {
			var index = $scope.doctorData.info.insurance_list.indexOf(insuranceToRemove);
			$scope.doctorData.info.insurance_list.splice(index, 1);
		};
		this.addMembership = function() {
			//console.log($scope.doctorData.info.practice_list[0]);
			$scope.doctorData.info.profesional_membership.push('');
		};
		this.removeMembership = function(membershipToRemove) {
			var index = $scope.doctorData.info.profesional_membership.indexOf(membershipToRemove);
			$scope.doctorData.info.profesional_membership.splice(index, 1);
		};

		var watched = {
			practices: {},
			practiceList: {},
			insurances: {},
			insurancesList: {},
		};

		var update = function(practices, practiceList) {
			if(!practices) return;
			if(!practiceList) return;

			// console.log('watch');
			// console.log(JSON.stringify(practices));
			// console.log(practices);
			if(practices) {
				for(var i in practices) {
					for( var j in practiceList) {
						if(practiceList[j] === practices[i].name) {
							$scope.selectedPracticeList[j] = practices[i];
						}
					}
				}
				// console.log('watch');
				// console.log($scope.selectedPracticeList);
			}
		}
		$scope.selectedPracticeList = [];
		$scope.$watch('doctorData.practices', function(newValue, oldValue) {
			watched.practices = newValue;
			update(watched.practices, watched.practiceList);
		});

		$scope.$watch('doctorData.info.practice_list', function(newValue, oldValue) {
			watched.practiceList = newValue;
			update(watched.practices ,watched.practiceList);
		});

		$scope.getInsurances = function(index) {
			//console.log($scope.docDashCtrl.insurances[index].type_list);
			return $scope.docDashCtrl.insurances[index].type_list;
		};

		// $scope.$watch('doctorData.insurances', function(newValue, oldValue) {
		// 	watched.insurances = newValue;
		// 	changeType(watched.insurances, watched.insurancesList);
		// });

		// var changeType = function(insurances, insurancesList) {
		// 	if (!insurances);
		// 	if (!insurancesList);

		// 	if(insurances) {
				
		// 	}
		// };

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			studiesInfo.practice_list = [];
			//console.log($scope.docInfo.info.practice_list.length);
			for (i=0; i < $scope.selectedPracticeList.length; i++) {
				studiesInfo.practice_list.push($scope.selectedPracticeList[i]);
			}
			//console.log(studiesInfo.practice_list);

			for(var i in studiesInfo.practice_list) {
				if (studiesInfo.practice_list[i] instanceof Array) {
					//console.log(i + 'Selección inválida');
					// var invalid_practice = 'Verifique la lista de especialidades.';
     //           		var alert_div = $("<div class=\"alert alert-danger alert-dismissible noty_dash noty fade in\"  role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">x</span><span class=\"sr-only\"></span></button>"+invalid_practice+"</div>");
					// $("body").prepend(alert_div);
					// $(".alert").alert();
					$('#practice_list_'+(parseInt(i)+1)).removeClass('ng-valid');
					$('#practice_list_'+(parseInt(i)+1)).removeClass('ng-pristine');
					$('#practice_list_'+(parseInt(i)+1)).addClass('ng-invalid');
					$('#practice_list_'+(parseInt(i)+1)).addClass('ng-dirty');
					return;
				} else {
					//console.log(i + 'Selección válida');
				}
			}

			var studiesInfoTemp = {};
			studiesInfoTemp.practice_list = [];

			for(var i = 0; i < studiesInfo.practice_list.length; i++) {
				studiesInfoTemp.practice_list.push(studiesInfo.practice_list[i].name);
			}

			studiesInfoTemp.education_list = {};
			studiesInfoTemp.education_list = $scope.doctorData.info.education_list;
			studiesInfoTemp.profesional_membership = [];
			studiesInfoTemp.profesional_membership = $scope.doctorData.info.profesional_membership;
			studiesInfoTemp.description = $scope.doctorData.info.description;

			// studiesInfoTemp.insurance_list = {};
			// studiesInfoTemp.insurance_list.insurance = $scope.doctorData.info.insurance_list[0].insurance.name;
			// studiesInfoTemp.insurance_list.insurance_type = $scope.doctorData.info.insurance_list[0].insurance_type.name;
			// console.log(studiesInfoTemp.insurance_list);

			console.log(studiesInfoTemp);
            /*$http.post(endpoint + type + '/Update/' + doc_id, studiesInfoTemp)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo actualizar tu formación académica, verifica la información de nuevo.';
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                   var success_msg = 'Tus datos de formación académica han sido actualizados con éxito.';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});*/
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
	docDash.controller('DashboardLocationsController', ['$http', '$scope',function($http, $scope){
		$scope.doctorData.locationsInfo = {};
		var locationsInfo = $scope.doctorData.locationsInfo;

		var cities = $scope.cities;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';

			locationsInfo.city = $scope.doctorData.info.city;
			locationsInfo.localidad = $scope.doctorData.info.localidad;
			locationsInfo.location_list = {};
			locationsInfo.location_list = $scope.doctorData.info.location_list;
			locationsInfo.location_list[0].lat = $scope.lat;
			locationsInfo.location_list[0].lon = $scope.lng;
			console.log(locationsInfo);
            $http.post(endpoint + type + '/Update/' + doc_id, locationsInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo actualizar tu ubicación, verifica la información de nuevo.';
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(locationsInfo));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                   var success_msg = 'Tus datos de ubicación han sido actualizados con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);

	//Controller for doctor settings
	docDash.directive('settings', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/doctor/settings.html',
	    	controller: 'DashboardSettingsController',
	    	controllerAs: 'dashSettingsCtrl',
	    };
	});
	docDash.controller('DashboardSettingsController', ['$http', '$scope',function($http, $scope){
		console.log('entra a settings');
		$scope.doctorData.settingsInfo = {};
		var settingsInfo = $scope.doctorData.settingsInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			settingsInfo.settings = {};
			//settingsInfo.settings = $scope.doctorData.info.settings;
			
			settingsInfo.settings.email_appointment_notifications = $scope.doctorData.info.settings.email_appointment_notifications;
			if (settingsInfo.settings.email_appointment_notifications == undefined) {
				settingsInfo.settings.email_appointment_notifications = false;
			};
			settingsInfo.settings.email_marketing_notifications = $scope.doctorData.info.settings.email_marketing_notifications;
			if (settingsInfo.settings.email_marketing_notifications == undefined) {
				settingsInfo.settings.email_marketing_notifications = false;
			};
			settingsInfo.settings.mobile_appointment_notifications = $scope.doctorData.info.settings.mobile_appointment_notifications;
			if (settingsInfo.settings.mobile_appointment_notifications == undefined) {
				settingsInfo.settings.mobile_appointment_notifications = false;
			};
			settingsInfo.settings.mobile_marketing_notifications = $scope.doctorData.info.settings.mobile_marketing_notifications;
			if (settingsInfo.settings.mobile_marketing_notifications == undefined) {
				settingsInfo.settings.mobile_marketing_notifications = false;
			};			
			console.log(settingsInfo);
			
            $http.post(endpoint + type + '/Update/' + doc_id, settingsInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                    var error_msg = 'No se pudieron actualizar tus notificaciones, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, usuario actualizado", data.response);
                   var success_msg = 'Tus notificaciones han sido actualizadas con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };
	}]);

	//Controller for doctor Gallery
	// docDash.directive('gallery', function() {
	//     return {
	//     	restrict: 'E',
	//     	templateUrl: 'www/partials/doctor/gallery.html',
	//     	controller: 'DashboardGalleryController',
	//     	controllerAs: 'dashGalleryCtrl',
	//     };
	// });
	// docDash.directive('imagesModel', ['$parse', function ($parse) {
	//     return {
	//         restrict: 'A',
	//         link: function(scope, element, attrs) {
	//             var model = $parse(attrs.imagesModel);
	//             var modelSetter = model.assign;
	            
	//             element.bind('change', function(){
	//                 scope.$apply(function(){
	//                     modelSetter(scope, element[0].files[0]);
	//                 });
	//             });
	//         }
	//     };
	// }]);
	// docDash.service('galleryUpload', ['$http', function ($http) {
	//     this.uploadFileToUrl = function(file, uploadUrl){
	//         var fd = new FormData();
	//         fd.append('image', file);
	//         $http.post(uploadUrl, fd, {
	//             transformRequest: angular.identity,
	//             headers: {'Content-Type': undefined}
	//         })
	//         .success(function(){
	//         	var success_msg = 'Sus imágenes han sido actualizadas con éxito!';
 //           		var alert_div = $("<div class=\"alert success alert-info alert-dismissible noty fade in\"  role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span class=\"sr-only\"></span></button>"+success_msg+"</div>");
	// 			$("body").prepend(alert_div);
	// 			$(".alert").alert();
	// 			setTimeout(function() {
	// 			      alert_div.fadeOut(1800);
	// 			}, 800);
	//         })
	//         .error(function(){
	//         });
	//     }
	// }]);
	// docDash.controller('DashboardGalleryController', ['$http', '$scope',function($http, $scope){
	// 	console.log('entra a gallery');
	// 	function readURL(input) {
	//         if (input.files && input.files[0]) {
	//             var reader = new FileReader();

	//             reader.onload = function (e) {
	//                 $('#gallery-pic').attr('src', e.target.result);
	//             }

	//             reader.readAsDataURL(input.files[0]);
	//         }
	//     }

	//     $("#image-gallery").change(function(){
	//         readURL(this);
	//     });

	//     this.addImage = function() {
	// 		$scope.doctorData.info.gallery.push({name: '', image_url: ''});
	// 	};

	// 	var type = 'Doctor';
	//     $scope.uploadFile = function(doc_id){
	//         var file = $scope.myFile;
	//         console.log('file is ' + JSON.stringify(file));
	//         var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
	//         galleryUpload.uploadFileToUrl(file, uploadUrl);
	//     };
	// }]);

	//////////////////////////////////////////////////////////////////
	//Module and Controllers for Admin Dashboard - PARENT CONTROLLER//
	//////////////////////////////////////////////////////////////////
	adminDash = angular.module('adminDashboard', []);
	adminDash.controller('AdminDashboardController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService){
		this.practices = [];
		this.insurances = [];

		var self = this;

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			console.log(response.data);
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			console.log(response.data);
			self.insurances = response.data.response;
		});

		//this.practices = [ {name: "Pediatra", id: 1}, {name: "Fonoaudiólogo", id: 2}, {name: "Ginecólogo", id: 3}, {name: "Ortopedista", id: 4}, {name: "Odontólogo", id: 5} ];
		this.cities = [ {name: "Bogotá", id: 1}, {name: "Medellín", id: 2}, {name: "Cali", id: 3}, {name: "Barranquilla", id: 4}, {name: "Pereira", id: 5}, {name: "Bucaramanga", id: 6} ];
		//this.insurances = [ {name: "Colpatria", id: 1}, {name: "Compensar", id: 2}, {name: "Sura", id: 3} ];

		console.log('THIS IS ADMIN');

		$('#admin-tab a, #myTab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});
	}]);
	//Controller for Search Doctors - Admin
	adminDash.directive('filters', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/filters.html',
	    	controller: 'SearchDoctorsController',
	    	controllerAs: 'searchDocsCtrl',
	    };
	});
	adminDash.controller('SearchDoctorsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){

		console.log('THIS IS SEARCH');
		var encodedParam = btoa("undefined");
		var params = {};

		this.getDoctors = function() {

			if($scope.searchDocsCtrl.practice == undefined || $scope.searchDocsCtrl.practice == null) {
				delete params.practice;
			}else{
				params.practice_list = $scope.searchDocsCtrl.practice.name;
			}
			if($scope.searchDocsCtrl.city == undefined || $scope.searchDocsCtrl.city == null) {
				delete params.city;
			}else{
				params.city = $scope.searchDocsCtrl.city.name;
			}
			if($scope.searchDocsCtrl.insurance == undefined || $scope.searchDocsCtrl.insurance == null) {
				delete params.insurance;
			}else{
				params.insurance_list = $scope.searchDocsCtrl.insurance.name;
			}
			if($scope.searchDocsCtrl.localidad == undefined || $scope.searchDocsCtrl.localidad == null) {
				delete params.localidad;
			}else{
				params.localidad = $scope.searchDocsCtrl.localidad.name;
			}

			console.log('Parametros de busqueda ', params);

			$('#docs-list').show();
			$http.post(endpoint + 'Doctor' + '/GetByParams', params)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data);
               		$('#docs-list').hide();
               		$(".doc-box").css('visibility', 'hidden');
					swal({  
						title: "", 
						text: "No se encontraron doctores con los criteros de búsqueda introducidos, vuelve a intentarlo.",   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
           		} else {
               		// if successful, bind success message to message
               		$('#docs-list').hide();
               		$scope.doctors = data.response
               		console.log('Resultado de la busqueda de doctores!', $scope.doctors);
           		}
	    	});
		};
	}]);
	//Controller for Doctor Management in Admin Dashboard
	adminDash.directive('doctors', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctors.html',
	    };
	});
	adminDash.controller('DoctorsManagementController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService){
		$('#doc-dash a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

		$('#doc-dash a[href="#/admin_dashboard/edit_doctor/{{docManageCtrl.info._id}}/#locations"]').on('shown.bs.tab', function (e) {
		    e.preventDefault();
		    var mapOptions = {
				zoom: 11,
				center: new google.maps.LatLng(4.6777333, -74.0956373),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			var initialMarker = [];
			$scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

			google.maps.event.addListener($scope.map, 'click', addPoint);

			//cargar ubicación en mapa
			var createMarker = function (lat, lng){
				console.log('ENTRA A CREAR MARKER');
				var marker = new google.maps.Marker({
					map: $scope.map,
					position: new google.maps.LatLng(lat, lng),
					//title: info.name +' '+ info.lastname
				});
				initialMarker.push(marker);
				// marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';
				
				// google.maps.event.addListener(marker, 'click', function(){
				// 	infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
				// 	infoWindow.open($scope.map, marker);
				// });
			}
			doctorLat = $scope.docInfo.info.location_list[0].lat;
			doctorLon = $scope.docInfo.info.location_list[0].lon;
			createMarker(doctorLat, doctorLon);

		    //añadir ubicación a mapa
			function addPoint(event) { 
			    var marker = new google.maps.Marker({
			        position: event.latLng,
			        map: $scope.map,
			        //draggable: true
			    });
			    var markers = [];
		    	markers.push(marker);
		    	$scope.lat = event.latLng.lat();
			    $scope.lng = event.latLng.lng();
			    console.log($scope.docInfo.info.location_list);
			    if ($scope.docInfo.info.location_list[0].lat && $scope.docInfo.info.location_list[0].lon) {
			    	initialMarker[0].setMap(null);
			    };
			    google.maps.event.addListener($scope.map, 'click', function() {
		    		marker.setMap(null);
			        for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
			        markers.splice(i, 1);
			    });
			}

		});

		this.practices = [];
		this.insurances = [];

		var self = this;

		$scope.localidades = localidades;
		
		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			console.log(response.data);
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			console.log(response.data);
			self.insurances = response.data.response;
		});

		var myDate = new Date();
		var currentYear = myDate.getFullYear();
		$scope.yearsList = [];
		var loadYears = function() {
			for (var i = 0; i < ((currentYear+1)-1950); i++) {
				$scope.yearsList[i] = 1950+i;
			};
			return $scope.yearsList;
		}
		loadYears();

		$scope.cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Pereira", "Bucaramanga"];

		var id = $routeParams.id;

		$scope.docInfo = this;

		$http.get(endpoint + 'Doctor' + '/GetByID/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron doctores",data.error);
               		swal({  
						title: "Error de Servidor", 
						text: "Ha ocurrido un error al cargar la información del doctor.",   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
               		//console.log(data);
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de usuarios:");
               		$scope.docInfo.info = data.response;
               		console.log($scope.docInfo.info);

               		if ($scope.docInfo.info.education_list.length == 0) {
               			$scope.docInfo.info.education_list.push({institute_name: '', degree: '', year_start: '', year_end: '', hilights: ''});
               		};
               		if ($scope.docInfo.info.profesional_membership.length == 0) {
               			$scope.docInfo.info.profesional_membership.push('');
               		};
               		if ($scope.docInfo.info.profesional_membership[0] == null) {
               			$scope.docInfo.info.profesional_membership[0] = '';
               		};
               		if ($scope.docInfo.info.description == 'undefined') {
               			$scope.docInfo.info.description = '';
               		};
               		if ($scope.docInfo.info.description == null) {
               			$scope.docInfo.info.description = '';
               		};
               		if ($scope.docInfo.info.location_list.length == 0) {
               			$scope.docInfo.info.location_list.push({location_name: '', location_address: '', lat: '', lon: ''});
               		};
               		if ($scope.docInfo.info.location_list[0] == null) {
               			$scope.docInfo.info.location_list[0] = {location_name: '', location_address: '', lat: '', lon: ''};
               		};
           		}
        	});
	}]);
	//Controller for Personal Info - Doctor by Admin
	adminDash.directive('docPersonal', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctor_personal.html',
	    	controller: 'ManageDocPersonalController',
	    	controllerAs: 'docPersonalManageCtrl',
	    };
	});
	adminDash.controller('ManageDocPersonalController', ['$http', '$scope',function($http, $scope){
		$scope.docInfo.personalInfo = {};
		var personalInfo = $scope.docInfo.personalInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			personalInfo.name = $scope.docInfo.info.name;
			personalInfo.lastname = $scope.docInfo.info.lastname;
			personalInfo.email = $scope.docInfo.info.email;
			if (personalInfo.birthday == 'undefined') {
				personalInfo.birthday = $scope.docInfo.info.birthday.getTime();
			};
			personalInfo.secondary_email = $scope.docInfo.info.secondary_email;
			personalInfo.gender = $scope.docInfo.info.gender;
			personalInfo.patient_gender = $scope.docInfo.info.patient_gender;
			personalInfo.address = $scope.docInfo.info.address;
			personalInfo.phone = $scope.docInfo.info.phone;
			console.log(personalInfo);
			console.log(doc_id);

            $http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudieron actualizar los datos personales, verifica la información de nuevo.';
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data.response);
                    var success_msg = 'Los datos personales han sido actualizados con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);
	//Controller for Profile Pic - Doctor by Admin
	adminDash.directive('docPictures', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctor_pictures.html',
	    	controller: 'ManageDocPictureController',
	    	controllerAs: 'docPicManageCtrl',
	    };
	});
	adminDash.directive('doctorPic', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.doctorPic);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);
	adminDash.service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('image', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){
	        	var success_msg = 'La foto de perfil ha sido actualizada con éxito.';
           		swal({  
					title: "", 
					text: success_msg,   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
	        })
	        .error(function(){
	        	var error_msg = 'No se pudo actualizar la foto de perfil, verifica la información de nuevo.';
           		swal({  
					title: "", 
					text: error_msg,   
					type: "error",   
					confirmButtonText: "Aceptar",
				});
	        });
	    }
	}]);
	adminDash.controller('ManageDocPictureController', ['$scope', 'fileUpload', function($scope, fileUpload){
		function readURL(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $('#doc-pic').attr('src', e.target.result);
	            }

	            reader.readAsDataURL(input.files[0]);
	        }
	    }

	    $("#doc-image").change(function(){
	        readURL(this);
	    });

    	var type = 'Doctor';
	    $scope.uploadPic = function(doc_id){
	        var file = $scope.myFile;
	        console.log('file is ' + JSON.stringify(file));
	        var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
	        fileUpload.uploadFileToUrl(file, uploadUrl);
	    };
	    
	}]);
	//Controller for Password Change - Doctor by Admin
	adminDash.directive('docPassword', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctor_password.html',
	    	controller: 'ManageDocPasswordController',
	    	controllerAs: 'docPasswordManageCtrl',
	    };
	});
	adminDash.controller('ManageDocPasswordController', ['$http', '$scope',function($http, $scope){
		$scope.docInfo.security = {};
		var securityInfo = $scope.docInfo.security;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';

			securityInfo.password = btoa($scope.security.password);
			securityInfo.new_password = btoa($scope.security.new_password);
			
            $http.post(endpoint + type + '/ChangePassword/' + doc_id, securityInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                     var error_msg = 'No se pudo actualizar la contraseña, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                   var success_msg = 'La contraseña ha sido cambiada con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };
	}]);
	//Controller for Studies - Doctor by Admin
	adminDash.directive('docStudies', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctor_studies.html',
	    	controller: 'ManageDocStudiesController',
	    	controllerAs: 'docStudiesManageCtrl',
	    };
	});
	adminDash.controller('ManageDocStudiesController', ['$http', '$scope',function($http, $scope){
		$scope.docInfo.studiesInfo = {};
		var studiesInfo = $scope.docInfo.studiesInfo;

		var practices = $scope.practices;

		//add or remove form fields
		this.addPractice = function() {
			//console.log($scope.docInfo.info.practice_list[0]);
			$scope.docInfo.info.practice_list.push(practices);
		};
		this.removePractice = function(practiceToRemove) {
			var index = $scope.selectedPracticeList.indexOf(practiceToRemove);
			$scope.docInfo.info.practice_list.splice(index, 1);
			$scope.selectedPracticeList.splice(index, 1);
		};
		this.addStudiesInfo = function() {
			$scope.docInfo.info.education_list.push({institute_name: '', degree: '', year_start: '', year_end: '', hilights: ''});
		};
		this.removeStudiesInfo = function(studiesToRemove) {
			var index = $scope.docInfo.info.education_list.indexOf(studiesToRemove);
			$scope.docInfo.info.education_list.splice(index, 1);
		};
		this.initStudiesInfo = function() {
			var studies = $scope.docInfo.info.education_list;
		};
		this.addInsurance = function() {
			//console.log($scope.doctorData.info.insurance_list[0]);
			$scope.doctorData.info.insurance_list.push({insurance: ''});
		};
		this.removeInsurance = function(insuranceToRemove) {
			var index = $scope.docInfo.info.insurance_list.indexOf(insuranceToRemove);
			$scope.docInfo.info.insurance_list.splice(index, 1);
		};
		this.addMembership = function() {
			//console.log($scope.doctorData.info.practice_list[0]);
			$scope.docInfo.info.profesional_membership.push('');
		};
		this.removeMembership = function(membershipToRemove) {
			var index = $scope.docInfo.info.profesional_membership.indexOf(membershipToRemove);
			$scope.docInfo.info.profesional_membership.splice(index, 1);
		};

		var watched = {
			practices: {},
			practiceList: {},
		};

		$scope.getInsurances = function(index) {
			//console.log($scope.docManageCtrl.insurances[index].type_list);
			return $scope.docManageCtrl.insurances[index].type_list;
		};

		var update = function(practices, practiceList) {
			if(!practices) return;
			if(!practiceList) return;

			// console.log('watch');
			// console.log(JSON.stringify(practices));
			// console.log(practices);
			if(practices) {
				for(var i in practices) {
					for( var j in practiceList) {
						if(practiceList[j] === practices[i].name) {
							$scope.selectedPracticeList[j] = practices[i];
						}
					}
				}
				// console.log('watch');
				// console.log($scope.selectedPracticeList);
			}
		}
		$scope.selectedPracticeList = [];
		$scope.$watch('docInfo.practices', function(newValue, oldValue) {
			watched.practices = newValue;
			update(watched.practices ,watched.practiceList);
		});

		$scope.$watch('docInfo.info.practice_list', function(newValue, oldValue) {
			watched.practiceList = newValue;
			update(watched.practices ,watched.practiceList);
		});

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';

			studiesInfo.practice_list = [];
			//console.log($scope.docInfo.info.practice_list.length);
			for (i=0; i < $scope.selectedPracticeList.length; i++) {
				studiesInfo.practice_list.push($scope.selectedPracticeList[i]);
			}
			//console.log(studiesInfo.practice_list);

			for(var i in studiesInfo.practice_list) {
				if (studiesInfo.practice_list[i] instanceof Array) {
					//console.log(i + 'Selección inválida');
					var invalid_practice = 'Verifique la lista de especialidades.';
               		var alert_div = $("<div class=\"alert alert-danger alert-dismissible noty_dash noty fade in\"  role=\"alert\"><button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">x</span><span class=\"sr-only\"></span></button>"+invalid_practice+"</div>");
					$("body").prepend(alert_div);
					$(".alert").alert();
					$('#practice_list_'+(parseInt(i)+1)).removeClass('ng-valid');
					$('#practice_list_'+(parseInt(i)+1)).removeClass('ng-pristine');
					$('#practice_list_'+(parseInt(i)+1)).addClass('ng-invalid');
					$('#practice_list_'+(parseInt(i)+1)).addClass('ng-dirty');
					return;
				} else {
					//console.log(i + 'Selección válida');
				}
			}

			var studiesInfoTemp = {};

			studiesInfoTemp.practice_list = [];
			for(var i = 0; i < studiesInfo.practice_list.length; i++) {
				studiesInfoTemp.practice_list.push(studiesInfo.practice_list[i].name);
			}

			studiesInfoTemp.education_list = {};
			studiesInfoTemp.education_list = $scope.docInfo.info.education_list;
			studiesInfoTemp.profesional_membership = [];
			studiesInfoTemp.profesional_membership = $scope.docInfo.info.profesional_membership;
			studiesInfoTemp.description = $scope.docInfo.info.description;
			// studiesInfoTemp.insurance_list = {};
			// studiesInfoTemp.insurance_list.insurance = $scope.docInfo.info.insurance_list[0].insurance.name;
			// studiesInfoTemp.insurance_list.insurance_type = $scope.docInfo.info.insurance_list[0].insurance_type.name;
			// console.log(studiesInfoTemp.insurance_list);
			console.log(studiesInfoTemp);
            $http.post(endpoint + type + '/Update/' + doc_id, studiesInfoTemp)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                     var error_msg = 'No se pudo actualizar la formación académica, verifica la información de nuevo.';
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                   var success_msg = 'Los datos de formación académica han sido actualizados con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);
	//Controller for Locations - Doctor by Admin
	adminDash.directive('docLocations', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctor_locations.html',
	    	controller: 'ManageDocLocationsController',
	    	controllerAs: 'docLocationsManageCtrl',
	    };
	});
	adminDash.controller('ManageDocLocationsController', ['$http', '$scope',function($http, $scope){
		$scope.docInfo.locationsInfo = {};
		var locationsInfo = $scope.docInfo.locationsInfo;

		var cities = $scope.cities;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';

			locationsInfo.city = $scope.docInfo.info.city;
			locationsInfo.localidad = $scope.docInfo.info.localidad;
			locationsInfo.location_list = {};
			locationsInfo.location_list = $scope.docInfo.info.location_list;
			locationsInfo.location_list[0].lat = $scope.lat;
			locationsInfo.location_list[0].lon = $scope.lng;
			console.log(locationsInfo);
            $http.post(endpoint + type + '/Update/' + doc_id, locationsInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo actualizar la ubicación, verifica la información de nuevo.';
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(locationsInfo));
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, doctor actualizado", data.response);
                   var success_msg = 'Los datos de ubicación han sido actualizados con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);
	//Controller for Settings - Doctor by Admin
	adminDash.directive('docSettings', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/doctor_settings.html',
	    	controller: 'ManageDocSettingsController',
	    	controllerAs: 'docSettingsManageCtrl',
	    };
	});
	adminDash.controller('ManageDocSettingsController', ['$http', '$scope',function($http, $scope){
		console.log('entra a settings');
		$scope.docInfo.settingsInfo = {};
		var settingsInfo = $scope.docInfo.settingsInfo;

		this.updateDoctor = function(doc_id) {
			var type = 'Doctor';
			
			settingsInfo.settings = {};
			//settingsInfo.settings = $scope.docInfo.info.settings;
			
			settingsInfo.settings.email_appointment_notifications = $scope.docInfo.info.settings.email_appointment_notifications;
			if (settingsInfo.settings.email_appointment_notifications == undefined) {
				settingsInfo.settings.email_appointment_notifications = false;
			};
			settingsInfo.settings.email_marketing_notifications = $scope.docInfo.info.settings.email_marketing_notifications;
			if (settingsInfo.settings.email_marketing_notifications == undefined) {
				settingsInfo.settings.email_marketing_notifications = false;
			};
			settingsInfo.settings.mobile_appointment_notifications = $scope.docInfo.info.settings.mobile_appointment_notifications;
			if (settingsInfo.settings.mobile_appointment_notifications == undefined) {
				settingsInfo.settings.mobile_appointment_notifications = false;
			};
			settingsInfo.settings.mobile_marketing_notifications = $scope.docInfo.info.settings.mobile_marketing_notifications;
			if (settingsInfo.settings.mobile_marketing_notifications == undefined) {
				settingsInfo.settings.mobile_marketing_notifications = false;
			};			
			console.log(settingsInfo);
			
            $http.post(endpoint + type + '/Update/' + doc_id, settingsInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    //console.log(JSON.stringify(data1));
                    var error_msg = 'No se pudieron actualizar las notificaciones, verifique la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                   console.log("Listo, usuario actualizado", data.response);
                   var success_msg = 'Las notificaciones han sido actualizadas con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };
	}]);
	//Controller for Hospitals - Seccions in Admin
	adminDash.directive('hospitals', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/hospitals.html',
	    	controller: 'AdminHospitalsController',
	    	controllerAs: 'hospitalsCtrl',
	    };
	});
	adminDash.controller('AdminHospitalsController', ['$http', '$scope',function($http, $scope){
		console.log('THIS IS HOSPITALS');
		var type = 'Hospital';

		this.createHospital = function() {
			console.log('THIS IS CREATE HOSPITALS');
			var data1 = this.info;
			
			console.log('datos para crear hospital');
			console.log(data1);

            $http.post(endpoint + type + '/Create', data1)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se creó", data);
                    var error_msg = 'No se pudo agregar el hospital, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, hospital creado", data);
                    var success_msg = 'El hospital ha sido creado con éxito!';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
					$("form #name").val('');
					$("form #email").val('');
                }
      		});
      		this.data = {};
        };

        this.showHospitals = function() {
        	var This = this;
			$http.get(endpoint + type + '/GetAll')
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se encontraron hospitales", data);
	               		var error_msg = 'Ha ocurrido un error al cargar la lista de hospitales.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Lista de hospitales");
	               		console.log(data);
	               		This.hospitals = data.response;
	           		}
	           	});
        };

        this.deleteHospital = function(id) {
        	console.log(id);
        	data1 = {};
        	data1.id = id;
        	console.log(data1);
			$http.post(endpoint + type + '/Delete', data1)
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se pudo eliminar el hospital", data);
	               		var error_msg = 'Ha ocurrido un error al intentar eliminar el hospital.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Hospital eliminado exitosamente.");
	               		console.log(data);
	               		var success = 'El hospital ha sido eliminado con é.';
	               		swal({  
							title: "", 
							text: success,   
							type: "success",   
							confirmButtonText: "Aceptar",
						});
	     //           		var index = $scope.doctorData.info.practice_list.indexOf(practiceToRemove);
						// $scope.doctorData.info.practice_list.splice(index, 1);
	           		}
	           	});
        };
	}]);
	//Controller for Hospital Management in Admin Dashboard
	adminDash.controller('HospitalsManagementController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		$('#hospi-tab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

		$('#hospi-tab a[href="#/admin_dashboard/edit_hospital/{{hospitalManageCtrl.info._id}}/#hospital_location"]').on('shown.bs.tab', function (e) {
		    e.preventDefault();
		    var mapOptions = {
				zoom: 11,
				center: new google.maps.LatLng(4.6777333, -74.0956373),
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}

			var initialMarker = [];
			$scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

			google.maps.event.addListener($scope.map, 'click', addPoint);

			//cargar ubicación en mapa
			var createMarker = function (lat, lng){
				console.log('ENTRA A CREAR MARKER');
				var marker = new google.maps.Marker({
					map: $scope.map,
					position: new google.maps.LatLng(lat, lng),
					//title: info.name +' '+ info.lastname
				});
				initialMarker.push(marker);
				// marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';
				
				// google.maps.event.addListener(marker, 'click', function(){
				// 	infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
				// 	infoWindow.open($scope.map, marker);
				// });
			}
			hospitalLat = $scope.hospitalInfo.info.location_list[0].lat;
			hospitalLon = $scope.hospitalInfo.info.location_list[0].lon;
			createMarker(hospitalLat, hospitalLon);

		    //añadir ubicación a mapa
			function addPoint(event) { 
			    var marker = new google.maps.Marker({
			        position: event.latLng,
			        map: $scope.map,
			        //draggable: true
			    });
			    var markers = [];
		    	markers.push(marker);
		    	$scope.lat = event.latLng.lat();
			    $scope.lng = event.latLng.lng();
			    console.log($scope.hospitalInfo.info.location_list);
			    if ($scope.hospitalInfo.info.location_list[0].lat && $scope.hospitalInfo.info.location_list[0].lon) {
			    	initialMarker[0].setMap(null);
			    };
			    google.maps.event.addListener($scope.map, 'click', function() {
		    		marker.setMap(null);
			        for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
			        markers.splice(i, 1);
			    });
			}

		});

		var id = $routeParams.id;
		var type = "Hospital";

		$scope.hospitalInfo = this;

		$http.get(endpoint + type + '/GetByID/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron hospitales",data.error);
               		var error_msg = 'Ha ocurrido un error al intentar cargar el hospital.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
               		console.log(data);
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de hospitales:");
               		$scope.hospitalInfo.info = data.response;
               		console.log($scope.hospitalInfo.info);

               		if ($scope.hospitalInfo.info.location_list.length == 0) {
               			$scope.hospitalInfo.info.location_list.push({address: ''});
               		};
           		}
        	});
	}]);
	//Controller for Basic Info - Admin Hospitals
	adminDash.directive('basicHospital', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/hospital/basic.html',
	    	controller: 'BasicHospitalController',
	    	controllerAs: 'basicHospitalCtrl',
	    };
	});
	adminDash.controller('BasicHospitalController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = "Hospital";
      	$scope.hospitalInfo.basicInfo = {};
		var basicInfo = $scope.hospitalInfo.basicInfo;
        this.updateHospital = function(hospital_id) {
			
			basicInfo.name = $scope.hospitalInfo.info.name;
			basicInfo.email = $scope.hospitalInfo.info.email;
			console.log(basicInfo);

            $http.post(endpoint + type + '/Update/' + hospital_id, basicInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo actualizar la información del hospital, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data);
                    var success_msg = 'La información del hospital ha sido actualizada con éxito!';
               		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);
	//Controller for Logo - Admin Hospitals
	adminDash.directive('hospitalLogo', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/hospital/logo.html',
	    	controller: 'LogoHospitalController',
	    	controllerAs: 'logoHospitalCtrl',
	    };
	});
	adminDash.directive('hospitalFile', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.hospitalFile);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);
	adminDash.service('hospitalUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('image', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){
	        	var success_msg = 'El logo del hospital ha sido actualizado con éxito.';
           		swal({  
					title: "", 
					text: success_msg,   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
	        })
	        .error(function(){
	        	var error_msg = 'No se pudo actualizar el logo del hospital.';
           		swal({  
					title: "", 
					text: error_msg,   
					type: "error",   
					confirmButtonText: "Aceptar",
				});
	        });
	    }
	}]);
	adminDash.controller('LogoHospitalController', ['$http', '$scope', '$routeParams', 'hospitalUpload', function($http, $scope, $routeParams, hospitalUpload){
		function readURL(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $('#hospital-logo').attr('src', e.target.result);
	            }

	            reader.readAsDataURL(input.files[0]);
	        }
	    }

	    $("#image").change(function(){
	        readURL(this);
	    });

    	var type = 'Hospital';
	    $scope.uploadFile = function(hospital_id){
	        var file = $scope.myFile;
	        console.log('file is ' + JSON.stringify(file));
	        var uploadUrl = endpoint + type + '/UpdatePic/' + hospital_id;
	        hospitalUpload.uploadFileToUrl(file, uploadUrl);
	    };
	}]);
	//Controller for Location - Admin Hospitals
	adminDash.directive('locationHospital', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/hospital/location.html',
	    	controller: 'LocationHospitalController',
	    	controllerAs: 'locationHospitalCtrl',
	    };
	});
	adminDash.controller('LocationHospitalController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = "Hospital";
      	$scope.hospitalInfo.location = {};
		var location = $scope.hospitalInfo.location;
        this.updateHospital = function(hospital_id) {
			
			location.location_list = {};
			location.location_list.address = $scope.hospitalInfo.info.location_list[0].address;
			location.location_list.lat = $scope.lat;
			location.location_list.lon = $scope.lng;
			console.log(location);

            $http.post(endpoint + type + '/Update/' + hospital_id, location)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se puedo actualizar la ubicación del hospital.';
	           		swal({  
						title: "", 
						text: success_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data);
                    var success_msg = 'La ubicación del hospital ha sido actualizada con éxito!';
	           		swal({  
					title: "", 
					text: success_msg,   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
                }
      		});
       };
	}]);
	//Controller for Insurances - Seccions in Admin
	adminDash.directive('insurances', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/insurances.html',
	    	controller: 'AdminInsurancesController',
	    	controllerAs: 'insurancesCtrl',
	    };
	});
	adminDash.controller('AdminInsurancesController', ['$http', '$scope',function($http, $scope){
		console.log('THIS IS INSURANCES');
		var type = 'InsuranceCompany';

		this.createInsurance = function() {
			console.log('THIS IS CREATE INSURANCES');
			var data1 = this.info;
			//data1.type_list = [];
			
			console.log('datos para crear aseguradora');
			console.log(data1);

            $http.post(endpoint + type + '/Create', data1)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se creó", data);
                    var error_msg = "No se puedo agregar la aseguradora, verifica la información de nuevo.";
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, aseguradora creada", data);
                    var success_msg = 'La aseguradora ha sido creada con éxito!';
                    swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
      		this.data = {};
        };

        this.showInsurances = function() {
        	var This = this;
			$http.get(endpoint + type + '/GetAll')
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se encontraron aseguradoras", data);
	               		var error_msg = 'Ha ocurrido un error al cargar la lista de aseguradoras.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Lista de aseguradoras");
	               		console.log(data);

	               		This.insurances = data.response;
	               		//console.log(JSON.stringify(dProfile.name));
	           		}
	           	});
        };

        this.deleteInsurance = function(id) {
        	console.log(id);
        	data1 = {};
        	data1.id = id;
        	console.log(data1);
			$http.post(endpoint + type + '/Delete', data1)
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se pudo eliminar la aseguradora", data);
	               		var error_msg = 'Ha ocurrido un error al intentar eliminar la aseguradora.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Aseguradora eliminada exitosamente.");
	               		console.log(data);
	               		var success = 'La aseguradora ha sido eliminada con éxito.';
	               		swal({  
							title: "", 
							text: success,   
							type: "success",   
							confirmButtonText: "Aceptar",
						});
	     //           		var index = $scope.doctorData.info.practice_list.indexOf(practiceToRemove);
						// $scope.doctorData.info.practice_list.splice(index, 1);
	           		}
	           	});
        };
	}]);
	//Controller for Insurance Management in Admin Dashboard
	adminDash.controller('InsurancesManagementController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		$('#insu-tab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

		var id = $routeParams.id;
		var type = "InsuranceCompany";

		$scope.insuranceInfo = this;

		$http.get(endpoint + type + '/GetByID/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron aseguradoras",data.error);
               		var error_msg = 'Ha ocurrido un error al intentar cargar la aseguradora.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
               		console.log(data);
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de aseguradoras:");
               		$scope.insuranceInfo.info = data.response;
               		console.log($scope.insuranceInfo.info);

               		if ($scope.insuranceInfo.info.type_list.length == 0) {
               			$scope.insuranceInfo.info.type_list.push({name: '', category: ''});
               		};
           		}
        	});
	}]);
	//Controller for Basic Info - Admin Insurances
	adminDash.directive('basicInsurance', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/insurance/basic.html',
	    	controller: 'BasicInsuranceController',
	    	controllerAs: 'basicInsuranceCtrl',
	    };
	});
	adminDash.controller('BasicInsuranceController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = "InsuranceCompany";
      	$scope.insuranceInfo.basicInfo = {};
		var basicInfo = $scope.insuranceInfo.basicInfo;

        this.updateInsurance = function(id) {
			
			basicInfo.name = $scope.insuranceInfo.info.name;
			basicInfo.email = $scope.insuranceInfo.info.email;
			console.log(basicInfo);
			console.log(id);

            $http.post(endpoint + type + '/Update/' + id, basicInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo actualizar la información de la aseguradora, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data);
                    var success_msg = 'La información de la aseguradora ha sido actualizada con éxito.';
               		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);
	//Controller for Logo - Admin Insurances
	adminDash.directive('insuranceLogo', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/insurance/logo.html',
	    	controller: 'LogoInsuranceController',
	    	controllerAs: 'logoInsuranceCtrl',
	    };
	});
	adminDash.directive('insuranceFile', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.insuranceFile);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
	}]);
	adminDash.service('insuranceUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        fd.append('image', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(){
	        	var success_msg = 'El logo de la aseguradora ha sido actualizado con éxito.';
           		swal({  
					title: "", 
					text: success_msg,   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
	        })
	        .error(function(){
	        	var error_msg = 'No se pudo actualizar el logo de la aseguradora.';
           		swal({  
					title: "", 
					text: error_msg,   
					type: "error",   
					confirmButtonText: "Aceptar",
				});
	        });
	    }
	}]);
	adminDash.controller('LogoInsuranceController', ['$http', '$scope', '$routeParams', 'insuranceUpload', function($http, $scope, $routeParams, insuranceUpload){
		function readURL(input) {
	        if (input.files && input.files[0]) {
	            var reader = new FileReader();

	            reader.onload = function (e) {
	                $('#insurance-logo').attr('src', e.target.result);
	            }

	            reader.readAsDataURL(input.files[0]);
	        }
	    }

	    $("#image").change(function(){
	        readURL(this);
	    });

    	var type = 'InsuranceCompany';
	    $scope.uploadFile = function(insurancecompany_id){
	        var file = $scope.myFile;
	        console.log('file is ' + JSON.stringify(file));
	        var uploadUrl = endpoint + type + '/UpdatePic/' + insurancecompany_id;
	        insuranceUpload.uploadFileToUrl(file, uploadUrl);
	    };
	}]);
	//Controller for Type List - Admin Insurances
	adminDash.directive('typeList', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/insurance/type_list.html',
	    	controller: 'TypeListController',
	    	controllerAs: 'typeListCtrl',
	    };
	});
	adminDash.controller('TypeListController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = "InsuranceCompany";
      	$scope.insuranceInfo.typeList = {};
		var typeList = $scope.insuranceInfo.typeList;

		this.addType = function() {
        	$scope.insuranceInfo.info.type_list.push({name: '', category: ''});
        };

        this.createType = function(insuranceCompanyID) {

			typeList = {};
			typeList.name = $scope.insuranceInfo.info.type_list.name;
			typeList.category = $scope.insuranceInfo.info.type_list.category;
			console.log(typeList);
			console.log(insuranceCompanyID);

            $http.post(endpoint + type + '/AddInsuranceType/' + insuranceCompanyID, typeList)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se pudo agregar el seguro, verifica la información de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data);
                    var success_msg = 'El seguro ha sido agregado con éxito.';
               		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
        };

        this.deleteType = function(id, type_id) {
        	console.log(id);
        	data1 = {};
        	data1.id = type_id;
        	console.log(data1);
			$http.post(endpoint + type + '/RemoveInsuranceType/' + id, data1)
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se pudo eliminar el seguro", data);
	               		var error_msg = 'Ha ocurrido un error al intentar eliminar el seguro.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Seguro eliminado exitosamente.");
	               		console.log(data);
	               		var success_msg = 'El seguro ha sido eliminado con éxito.';
	               		swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
						});
	     //           		var index = $scope.doctorData.info.practice_list.indexOf(practiceToRemove);
						// $scope.doctorData.info.practice_list.splice(index, 1);
	           		}
	           	});
        };
	}]);
	//Controller for Practices - Seccions in Admin
	adminDash.directive('practices', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/admin/practices.html',
	    	controller: 'AdminPracticesController',
	    	controllerAs: 'practicesCtrl',
	    };
	});
	adminDash.controller('AdminPracticesController', ['$http', '$scope',function($http, $scope){
		console.log('THIS IS PRACTICES');
		var type = 'Practice';

		this.createPractice = function() {
			console.log('THIS IS CREATE PRACTICES');
			var data1 = this.info;
			//data1.type_list = [];
			
			console.log('datos para crear especialidad');
			console.log(data1);

            $http.post(endpoint + type + '/Create', data1)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se creó", data);
                    var error_msg = "No se puedo agregar la especialidad, verifica la información de nuevo.";
                    swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, especialidad creada", data);
                    var success_msg = 'La especialidad ha sido creada con éxito!';
                    swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
					$("form #name").val('');
					$("form #type").val('');
                }
      		});
      		this.data = {};
        };

        this.showPractices = function() {
        	var This = this;
			$http.get(endpoint + type + '/GetAll')
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se encontraron especialidades", data);
	               		var error_msg = 'Ha ocurrido un error al intentar cargar la lista de especialidades.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Lista de especialidades");
	               		console.log(data);

	               		This.practices = data.response;
	               		//console.log(JSON.stringify(dProfile.name));
	           		}
	           	});
        };

        this.deletePractice = function(id) {
        	console.log(id);
        	data1 = {};
        	data1.id = id;
			$http.post(endpoint + type + '/Delete', data1)
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se pudo eliminar la especialidad", data);
	               		var error_msg = 'Ha ocurrido un error al intentar eliminar la especialidad.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Especialidad eliminada exitosamente.");
	               		console.log(data);
	               		var success = 'La especialidad ha sido eliminada con éxito.';
	               		swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
						});
	     //           		var index = $scope.doctorData.info.practice_list.indexOf(practiceToRemove);
						// $scope.doctorData.info.practice_list.splice(index, 1);
	           		}
	           	});
        };
	}]);
	//Controller for Practice Management in Admin Dashboard
	adminDash.controller('PracticesManagementController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		$('#prac-tab a').click(function (e) {
		  e.preventDefault();
		  $(this).tab('show');
		});

		var id = $routeParams.id;
		var type = "Practice";

		$scope.practiceInfo = this;

		$http.get(endpoint + type + '/GetByID/' + id)
      		.success(function(data) {
            	if (!data.status) {
               		console.log("No se encontraron especialidades",data.error);
               		console.log(data);
               		var error_msg = 'Ha ocurrido un error al intentar cargar la especialidad.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de especialidades:");
               		$scope.practiceInfo.info = data.response;
               		console.log($scope.practiceInfo.info);

               		// if ($scope.insuranceInfo.info.type_list.length == 0) {
               		// 	$scope.insuranceInfo.info.type_list.push({name: '', category: ''});
               		// };
           		}
        	});
	}]);
	//Controller for Basic Info - Admin Practices
	adminDash.directive('basicPractice', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/practice/basic.html',
	    	controller: 'BasicPracticeController',
	    	controllerAs: 'basicPracticeCtrl',
	    };
	});
	adminDash.controller('BasicPracticeController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = "Practice";
      	$scope.practiceInfo.basicInfo = {};
		var basicInfo = $scope.practiceInfo.basicInfo;

        this.updatePractice = function(practice_id) {
			
			basicInfo.name = $scope.practiceInfo.info.name;
			basicInfo.type = $scope.practiceInfo.info.type;
			console.log(basicInfo);
			console.log(practice_id);

            $http.post(endpoint + type + '/Update/' + practice_id, basicInfo)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se puede actualizar la información de la especialidad, verifica de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, doctor actualizado", data);
                    var success_msg = 'La información de la especialidad ha sido actualizada con éxito!';
               		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };
	}]);
	//Controller for Appointment Reasons Info - Admin Practices
	adminDash.directive('reasonsPractice', function() {
	    return {
	    	restrict: 'E',
	    	templateUrl: 'www/partials/practice/reasons.html',
	    	controller: 'ReasonsPracticeController',
	    	controllerAs: 'reasonsPracticeCtrl',
	    };
	});
	adminDash.controller('ReasonsPracticeController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams){
		var type = "Practice";
      	$scope.practiceInfo.reasons = {};
		var reasons = $scope.practiceInfo.reasons;

        this.createReason = function(practice_id) {
			
			reasons.reason = $scope.practiceInfo.info.reason_list.reason;
			console.log(reasons);
			console.log(practice_id);

            $http.post(endpoint + type + '/AddAppointmentReason/' + practice_id, reasons)
            .success(function(data) {
                if (!data.status) {
                    console.log("Paila, no se actualizó", data);
                    var error_msg = 'No se puede agregar el motivo de consulta, verifica de nuevo.';
               		swal({  
						title: "", 
						text: error_msg,   
						type: "error",   
						confirmButtonText: "Aceptar",
					});
                    //console.log(JSON.stringify(data1));
                } else {
                   // if successful, bind success message to message
                    console.log("Listo, motivo de consulta actualizado", data);
                    var success_msg = 'El motivo de consulta ha sido agregado con éxito!';
               		swal({  
						title: "", 
						text: success_msg,   
						type: "success",   
						confirmButtonText: "Aceptar",
					});
                }
      		});
       };

       this.deleteReason = function(practice_id, reason_id) {
        	console.log(practice_id);
        	data1 = {};
        	data1.reason_id = reason_id;
        	console.log(data1);
			$http.post(endpoint + type + '/RemoveAppointmentReason/' + practice_id, data1)
	      		.success(function(data) {
	            	if (!data.status) {
	               		console.log("No se pudo eliminar el motivo", data);
	               		var error_msg = 'No se puedo agregar el motivo de consulta, verifica de nuevo.';
	               		swal({  
							title: "", 
							text: error_msg,   
							type: "error",   
							confirmButtonText: "Aceptar",
						});
	           		} else {
	               		// if successful, bind success message to message
	               		console.log("Motivo eliminado exitosamente.");
	               		console.log(data);
	               		var index = $scope.practiceInfo.info.reason_list.indexOf(reason_id);
						$scope.practiceInfo.info.reason_list.splice(index, 1);
						 var success_msg = 'El motivo de consulta ha sido eliminado con éxito!';
	               		swal({  
							title: "", 
							text: success_msg,   
							type: "success",   
							confirmButtonText: "Aceptar",
						});
	           		}
	           	});
        };
	}]);

})();


