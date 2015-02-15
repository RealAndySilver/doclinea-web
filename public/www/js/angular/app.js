(function() {

	var app = angular.module('doclinea', [
		'ngRoute',
		'searchList',
		'searching',
		'loginUser',
		'loginDoctor',
		'createUser',
		'createDoctor',
		'docProfile',
		'doctorDashboard',
		'userDashboard',
		'userAppointments',
		'userDoctors',
		'adminDashboard',
		'calendarDoctor',
		'calendarProfile',
		'booking',
		'ui.calendar',
		'ui.bootstrap',
		'ui.modal',
	]);

	var endpoint = "http://192.241.187.135:1414/api_1.0/";
	//var endpoint = "http://192.168.0.40:1414/api_1.0/";
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
			}).
			when('/insurances_list', {
				templateUrl: '../www/insurances_list.html',
			}).
			when('/registration', {
				templateUrl: '../www/registration.html',
			}).
			when('/benefits', {
				templateUrl: '../www/benefits.html',
			}).
			when('/sign_up', {
				templateUrl: '../www/sign_up.html',
			}).
			when('/sign_in', {
				templateUrl: '../www/sign_in.html',
			}).
			when('/user/:id', {
				templateUrl: '../www/user.html',
				controller: 'UserDashboardController',
				controllerAs: 'userDashCtrl',
			}).
			when('/doctor/:id', {
				templateUrl: '../www/doctor.html',
				controller: 'ProfileCtrl',
				controllerAs: 'profile',
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
				controllerAs: 'confirmCtrl',
			}).
			when('/account_activation/:type/:email', {
				templateUrl: '../www/confirmation.html',
				controller: 'AccountActivationController',
				controllerAs: 'activeCtrl',
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
				controllerAs: 'docDashCtrl',
			}).
			when('/admin_dashboard', {
				templateUrl: '../www/admin_dashboard.html',
				controller: 'AdminDashboardController',
				controllerAs: 'adminCtrl',
			}).
			when('/admin_dashboard/edit_doctor/:id', {
				templateUrl: '../www/doctors_management.html',
				controller: 'DoctorsManagementController',
				controllerAs: 'docManageCtrl',
			}).
			when('/admin_dashboard/edit_hospital/:id', {
				templateUrl: '../www/hospitals_management.html',
				controller: 'HospitalsManagementController',
				controllerAs: 'hospitalManageCtrl',
			}).
			when('/admin_dashboard/edit_insurance/:id', {
				templateUrl: '../www/insurances_management.html',
				controller: 'InsurancesManagementController',
				controllerAs: 'insuranceManageCtrl',
			}).
			when('/admin_dashboard/edit_practice/:id', {
				templateUrl: '../www/practices_management.html',
				controller: 'PracticesManagementController',
				controllerAs: 'practiceManageCtrl',
			}).
			when('/calendar/:doctorId', {
				templateUrl: '../www/partials/doctor/appointments.html',
				controller: 'CalendarCtrl',
			}).
			when('/booking/:eventId/:doctorId/:start/:end', {
				templateUrl: '../www/booking.html',
				controller: 'BookingController',
				controllerAs: 'bkngCtrl',
			}).
			otherwise({
				redirectTo: '/404'
			});
		}
	]);


	//DATA
	//Global data (practices)
	//Hardcoded data (Cities, Practices)
	var localidades = [{
		name: "Antonio Nariño",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Barrios Unidos",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Bosa",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Chapinero",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Ciudad Bolivar",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Engativá",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Fontibón",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Keneddy",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "La Candelaria",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Los Mártires",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Puente Aranda",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Rafael Uribe",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "San Cristóbal",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Santa Fe",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Suba",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Sumapaz",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Teusaquillo",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Tunjuelito",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Usaquén",
		lat: 4.5,
		lon: 74.5,
	}, {
		name: "Usme",
		lat: 4.5,
		lon: 74.5,
	}, ];

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
				if (!ngModel) return; // do nothing if no ng-model

				// watch own value and re-validate on change
				scope.$watch(attrs.ngModel, function() {
					validate();
				});

				// observe the other value and re-validate on change
				attrs.$observe('equals', function(val) {
					validate();
				});

				var validate = function() {
					// values
					var val1 = ngModel.$viewValue;
					var val2 = attrs.equals;

					// set validity
					ngModel.$setValidity('equals', !val1 || !val2 || val1 === val2);
				};
			}
		}
	});

	//ACCOUNTS AND AUTHENTICATION
	

	var login = angular.module('loginUser', []);
	login.controller('SignInController', ['$http', 'User', function($http, User) {
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
						if (data.error_id == 0) {
							swal({
								title: "",
								text: "Email o contraseña incorrectos.",
								type: "error",
								confirmButtonText: "Aceptar",
							});
						} else if (data.error_id == 1) {
							swal({
								title: "",
								text: "Recuerda activar primero tu cuenta.",
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
						console.log("Listo, autenticado" + data);
						var user = data.response;
						window.location = "/#/user/" + user._id;

						User.username = user.name + ' ' + user.lastname;
						User.isDoctor = false;
						User.id = user._id;
						User.gender = user.gender;
						User.email = user.email;

						console.log('Mi objeto USUARIO es', User);

						// Store
						localStorage.setItem('user', JSON.stringify(User));
					}
				});
			//this.data = {};
		};
	}]);

	

	var loginDoctor = angular.module('loginDoctor', []);
	loginDoctor.controller('DoctorSignInController', ['$http', '$scope', '$routeParams', '$location', '$anchorScroll', 'User', function($http, $scope, $routeParams, $location, $anchorScroll, User) {
		var type = "Doctor";

		this.signIn = function() {
			//console.log('Entra a signIn');
			var data1 = this.data;
			data1.password = btoa(data1.password);
			// data1.password_verify = btoa(data1.password_verify);
			$http.post(endpoint + type + '/Authenticate', data1)
				.success(function(data) {
					if (!data.status) {
						console.log("Paila, no se autenticó", data);
						var auth_error = data.error;
						if (data.error_id == 0) {
							swal({
								title: "",
								text: "Email o contraseña incorrectos.",
								type: "error",
								confirmButtonText: "Aceptar",
							});
						} else if (data.error_id == 1) {
							swal({
								title: "",
								text: "Recuerda activar primero tu cuenta.",
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

						User.username = doc.name + ' ' + doc.lastname;
						User.id = doc._id;
						User.isDoctor = true;
						User.email = doc.email;

						// Store
						localStorage.setItem('user', JSON.stringify(User));
					}
				});
			//this.data = {};
		};
	}]);

	app.controller('LoginWelcomeController', ['$scope', '$http', '$location', '$anchorScroll', 'UserService', function($scope, $http, $location, $anchorScroll, UserService) {
		var self = this;

		this.getStatus = function() {
			var user = UserService.getUser();
			var username = user.username;

			if (username) {
				if (user.isDoctor) {
					return 2;
				} else {
					return 1;
				}
			}
			return 0;
		};

		localStorage.getItem("user");
		if (localStorage.getItem("user")) {
			$scope.userData = JSON.parse(localStorage.user);
		};

		this.logout = function() {
			location.reload();
			localStorage.removeItem("user");
			window.location = "/#";
		};

		this.getUsername = function() {
			return UserService.getUser().username;
		};
		this.getUserId = function() {
			return UserService.getUser().id;
		}

	}]);

	app.value('User', {
		username: '',
		isDoctor: false,
		id: '',
		gender: '',
	});

	app.service('UserService', ['User', function(User) {
		this.getUser = function() {
			if (!localStorage.getItem("user")) {
				return User;
			}

			var user = JSON.parse(localStorage.getItem("user"));
			User = user;

			return User;
		};
	}]);

	//Controller for Modal.js
	var modalView = angular.module('ui.modal', [])
	modalView.controller('ModalCtrl', function($scope, $modal) {

		$scope.openUser = function(size) {

			var modalUser = $modal.open({
				templateUrl: '../www/user_password_recover.html',
				controller: 'UserPasswordRecoverController',
				size: size,
				resolve: {
					items: function() {
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
					items: function() {
						return $scope.items;
					}
				}
			});
		};

	});

	//Controllers for Password Recovering
	app.controller('PasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {
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
	app.controller('UserPasswordRecoverController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {
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
	app.controller('NewPasswordController', ['$http', '$routeParams', function($http, $routeParams) {
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
	app.controller('AccountConfirmationController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

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
	app.controller('AccountActivationController', ['$http', '$routeParams', '$scope', function($http, $routeParams, $scope) {
		$scope.type = $routeParams.type;
		console.log($scope.type);
	}]);

	


	



})();