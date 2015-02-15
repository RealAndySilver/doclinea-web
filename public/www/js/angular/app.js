(function() {

	var app = angular.module('doclinea', [
		'ngRoute',
		'searchList',
		'searching',
		'loginUser',
		'loginDoctor',
		'createUser',
		'createDoctor',
		'session',
		'verify',
		'recovering',
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



	



})();