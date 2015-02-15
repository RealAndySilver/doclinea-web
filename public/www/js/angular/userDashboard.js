///////////////////////////////////////////////////////////////////
//Module and Controllers for User Dashboard - PARENT CONTROLLER////
///////////////////////////////////////////////////////////////////
var endpoint = "http://192.241.187.135:1414/api_1.0/";

userDash = angular.module('userDashboard', []);
userDash.controller('UserDashboardController', ['$http', '$scope', '$routeParams', 'InsurancesService', function($http, $scope, $routeParams, InsurancesService) {
	var type = 'User';

	$('#user-tab a, #myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	var id = $routeParams.id;

	$scope.userData = this;

	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron usuarios", data.error);
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
userDash.controller('UserInfoController', ['$http', '$scope', function($http, $scope) {
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
userDash.controller('UserPasswordController', ['$http', '$scope', function($http, $scope) {
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
userDash.controller('UserSettingsController', ['$http', '$scope', function($http, $scope) {
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