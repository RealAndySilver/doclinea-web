///////////////////////////////////////////////////////////////////
//Module and Controllers for User Dashboard - PARENT CONTROLLER////
///////////////////////////////////////////////////////////////////
var endpoint = "http://doclinea.com:1414/api_1.0/";

userDash = angular.module('userDashboard', []);
userDash.controller('UserDashboardController', ['$http', '$scope', '$routeParams', 'InsurancesService', function($http, $scope, $routeParams, InsurancesService) {
	var type = 'User';

	//Fix para que se muestre correctamente el contenido dentro del tab seleccionado
	$('#user-tab a, #myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	//Capturar ID de la URL
	var id = $routeParams.id;

	$scope.userData = this;

	//Servicio que carga un Usuario por su ID
	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del usuario.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				$scope.userData.info = data.response;
			}
		});
}]);

//Directiva y Controlador para editar información personal de Usuario
userDash.directive('personalUser', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/user/personal.html',
		controller: 'UserInfoController',
		controllerAs: 'userInfoCtrl',
	};
});
userDash.controller('UserInfoController', ['$http', '$scope', function($http, $scope) {
	$scope.userData.personalInfo = {};
	var personalInfo = $scope.userData.personalInfo;

	//Función para actualizar información personal de Doctor
	this.updateUser = function(user_id) {
		var type = 'User';

		//Objeto PersonalInfo para guardar la información que se va a editar
		personalInfo.name = $scope.userData.info.name;
		personalInfo.lastname = $scope.userData.info.lastname;
		personalInfo.email = $scope.userData.info.email;
		if (personalInfo.birthday == 'undefined') {
			personalInfo.birthday = $scope.userData.info.birthday.getTime();
		};
		personalInfo.gender = $scope.userData.info.gender;
		personalInfo.phone = $scope.userData.info.phone;
		personalInfo.city = $scope.userData.info.city;
		personalInfo.address = $scope.userData.info.address;

		//Servicio POST para actualizar la información personal de Doctor
		$http.post(endpoint + type + '/Update/' + user_id, personalInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudieron actualizar tus datos personales, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
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

//Directiva y Controlador para editar la contraseña de Usuario
userDash.directive('passwordChangeUser', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/user/password_change.html',
		controller: 'UserPasswordController',
		controllerAs: 'userPassCtrl',
	};
});
userDash.controller('UserPasswordController', ['$http', '$scope', function($http, $scope) {
	//Objeto security para guardar la información que se va a editar
	$scope.userData.security = {};
	var securityInfo = $scope.userData.security;

	this.updateUser = function(user_id) {
		var type = 'User';

		//Las contraseñas del formulario se codifican en base64
		securityInfo.password = btoa($scope.security.password);
		securityInfo.new_password = btoa($scope.security.new_password);

		//Servicio POST para actualizar la contraseña de un Doctor
		$http.post(endpoint + type + '/ChangePassword/' + user_id, securityInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo actualizar tu contraseña, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
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

//Directiva y Controlador para editar ajustes de notificaciones de Usuario
userDash.directive('userSettings', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/user/settings.html',
		controller: 'UserSettingsController',
		controllerAs: 'settingsCtrl',
	};
});
userDash.controller('UserSettingsController', ['$http', '$scope', function($http, $scope) {
	//Objeto settingsInfo que guarda la información que se va a editar
	$scope.userData.settingsInfo = {};
	var settingsInfo = $scope.userData.settingsInfo;

	this.updateUser = function(user_id) {
		var type = 'User';

		settingsInfo.settings = {};

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

		//Servicio POST para actualizar ajustes de notificaciones de Doctor
		$http.post(endpoint + type + '/Update/' + user_id, settingsInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudieron actualizar tus notificaciones, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
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