(function() {

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
	var createUser = angular.module('createUser', []);
	createUser.controller('SignUpController', ['$http', '$scope', function($http, $scope) {
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
						window.location = "/#/account_confirmation/" + type + "/" + email;
					}
				});
			//this.data = {};
		};
	}]);

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

	var createDoctor = angular.module('createDoctor', []);
	createDoctor.controller('DoctorSignUpController', ['$http', '$scope', 'PracticesService', '$location', '$anchorScroll', function($http, $scope, PracticesService, $location, $anchorScroll) {
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
						console.log("Paila, no se creó", data);
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
						window.location = "/#/account_confirmation/" + type + "/" + email;
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

	//Parent Controller for Doctors Searching
	app.controller('GetDoctorsController', ['$http', '$routeParams', function($http, $routeParams) {

		var encodedParam = btoa("undefined");

		var docData = this;

		var city = $routeParams.city;
		var localidad = $routeParams.localidad;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;

		docData.data1 = {};
		docData.data1.localidad = {};

		if (city !== encodedParam) {
			docData.data1.city = city;
		}

		if (practice_list !== encodedParam) {
			docData.data1.practice_list = practice_list;
		}

		if (insurance_list !== encodedParam) {
			var split = insurance_list.split('+');
			docData.data1.insurance_list = [{
				insurance: split[0],
				insurance_type: split[1]
			}];
		}

		if (localidad !== encodedParam) {
			docData.data1.localidad.name = localidad;
		}

	}]);


	//SEARCH DOCTOR FROM LANDING PAGE
	app.controller('SearchListsController', ['$http', '$scope', 'PracticesService', 'InsurancesService', function($http, $scope, PracticesService, InsurancesService) {
		$scope.encodedParam = btoa("undefined");

		this.practices = [];
		this.insurances = [];
		this.localidades = localidades;

		var self = this;

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			self.insurances = response.data.response;
		});
	}]);

	app.controller('LandpageDocSearchController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService) {

		var encodedParam = btoa("undefined");

		this.docs = [];
		this.practices = [];
		$scope.insurances = [];
		this.localidades = localidades;

		var self = this;

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			$scope.insurances = response.data.response;
		});

		$scope.getInsurances = function(index) {
			if (index) {
				return index.insurance.type_list;
			}
			return;
		};

		this.cities = [{
			name: "Bogotá",
			id: 1
		}, {
			name: "Medellín",
			id: 2
		}, {
			name: "Cali",
			id: 3
		}, {
			name: "Barranquilla",
			id: 4
		}, {
			name: "Pereira",
			id: 5
		}, {
			name: "Bucaramanga",
			id: 6
		}];

		var city = $routeParams.city;
		var practice_list = $routeParams.practice_list;
		var insurance_list = $routeParams.insurance_list;
		var localidad = $routeParams.localidad;

		var data1 = {};
		data1.localidad = {};

		if (city !== encodedParam) {
			data1.city = city;
		}

		if (practice_list !== encodedParam) {
			data1.practice_list = practice_list;
		}

		if (insurance_list !== encodedParam || insurance_list == undefined) {
			data1.insurance_list = insurance_list;
		}

		if (localidad !== encodedParam) {
			data1.localidad.name = localidad;
		}

		var getPosition = function(list, option) {
			for (var i in list) {
				if (list[i].name === option) {
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
			var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance;
			var selectedLocalidad = !this.selectedLocalidad ? encodedParam : this.selectedLocalidad.name;

			var selectedInsuranceUrl = selectedInsurance.insurance ? selectedInsurance.insurance.name + '+' + selectedInsurance.insurance_type.name : encodedParam;

			window.location = "/#/search/" + selectedCity + "/" + selectedLocalidad + "/" + selectedPractice + "/" + selectedInsuranceUrl;
		};

	}]);


	//GET DOCTOR BY SEARCH PARAMS --> to search page
	app.controller('DoctorSearchController', ['$http', '$scope', 'PracticesService', 'InsurancesService', function($http, $scope, PracticesService, InsurancesService) {

		var encodedParam = btoa("undefined");

		var docData = this;
		this.practices = [];
		$scope.insurances = [];
		this.localidades = localidades;

		var self = this;

		docData.city = $scope.getDrCtrl.data1.city;
		docData.practice = $scope.getDrCtrl.data1.practice_list;
		docData.insurance = $scope.getDrCtrl.data1.insurance_list;
		docData.localidad = $scope.getDrCtrl.data1.localidad;

		var getPosition = function(list, option) {
			for (var i in list) {
				if (list[i].name === option) {
					return list[i];
				}
			}
		};

		var promiseGetAllPractices = PracticesService.getAll();
		promiseGetAllPractices.then(function(response) {
			self.practices = response.data.response;
		});

		var promiseGetAllInsurances = InsurancesService.getAll();
		promiseGetAllInsurances.then(function(response) {
			$scope.insurances = response.data.response;
		});

		$scope.getInsurances = function(index) {
			if (index) {
				return index.insurance.type_list;
			}
			return;
		};

		this.selectedPractice = getPosition(this.practices, docData.practice);

		this.cities = [{
			name: "Bogotá",
			id: 1
		}, {
			name: "Medellín",
			id: 2
		}, {
			name: "Cali",
			id: 3
		}, {
			name: "Barranquilla",
			id: 4
		}, {
			name: "Pereira",
			id: 5
		}, {
			name: "Bucaramanga",
			id: 6
		}];
		this.selectedCity = getPosition(this.cities, docData.city);
		this.selectedInsurance = getPosition(this.insurances, docData.insurance_list);
		this.selectedLocalidad = getPosition(this.localidades, docData.localidad.name);

		this.searchDoctor = function() {

			var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
			var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
			var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance;
			var selectedLocalidad = !this.selectedLocalidad ? encodedParam : this.selectedLocalidad.name;

			var selectedInsuranceUrl = selectedInsurance.insurance ? selectedInsurance.insurance.name + '+' + selectedInsurance.insurance_type.name : encodedParam;

			window.location = "/#/search/" + selectedCity + "/" + selectedLocalidad + "/" + selectedPractice + "/" + selectedInsuranceUrl;
		};
	}]);


	//PROFILES LIST + MAP WITH DOCTORS LOCATIONS
	var mapView = angular.module('mapsApp', [])
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

	//Controller for Doctor Profile
	var profileView = angular.module('docProfile', [])
		.controller('ProfileCtrl', function($scope, $http, $routeParams) {

			var type = "Doctor";
			var id = $routeParams.id;
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

					var createMarker = function(info) {
						//console.log('ENTRA A CREAR MARKER');
						var marker = new google.maps.Marker({
							map: $scope.map,
							position: new google.maps.LatLng(info.location_list[0].lat, info.location_list[0].lon),
							title: info.name + ' ' + info.lastname
						});
						marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><h4>' + info.location_list[0].location_address + '</h4></div></div>';

						google.maps.event.addListener(marker, 'click', function() {
							infoWindow.setContent('<h5 class="info-map-title">' + marker.title + '</h5>' + marker.content);
							infoWindow.open($scope.map, marker);
						});

						//$scope.markers.push(marker);
					}

					createMarker(This.dProfile);
					$scope.encodedParam = btoa("undefined");
				});

			$scope.favDoctor = function(doctorId) {
				localStorage.getItem("user");
				$scope.userData = JSON.parse(localStorage.user);
				var userId = $scope.userData.id;
				var doctorToFav = {};
				doctorToFav.doctor_id = doctorId;

				$http.post(endpoint + "User" + '/Fav/' + userId, doctorToFav)
					.success(function(data) {
						if (!data.status) {
							console.log("No se agregó", data);
							//console.log(JSON.stringify(data1));
							var error_msg = 'No se pudo agregar el doctor a favoritos.';
							swal({
								title: "",
								text: error_msg,
								type: "error",
								confirmButtonText: "Aceptar",
							});
						} else {
							// if successful, bind success message to message
							console.log("Listo, doctor agregado", data.response);
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

	//Controller for Doctor Appointments on Profile
	profileView.directive('availableCalendar', function($routeParams) {
		return {
			restrict: 'E',
			templateUrl: 'www/partials/doctor/available_appointments.html',
			controller: 'CalendarProfileCtrl',
			controllerAs: 'calProfileCtrl',
		};
	});

	

	

	


	


	


})();