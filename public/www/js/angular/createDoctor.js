var endpoint = "http://192.241.187.135:1414/api_1.0/";

//Modulo y Controlador para crear cuenta de Doctor
var createDoctor = angular.module('createDoctor', []);
createDoctor.controller('DoctorSignUpController', ['$http', '$scope', 'PracticesService', '$location', '$anchorScroll', function($http, $scope, PracticesService, $location, $anchorScroll) {
	//Cargar localidades de Bogotá
	$scope.localidades = localidades;

	this.practices = [];

	var self = this;

	//Cargar especialidades
	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		console.log(response.data);
		self.practices = response.data.response;
	});

	var type = "Doctor";

	//función para crear cuenta
	this.signUp = function() {
		var data1 = this.data;
		//la contraseña y su confirmación se codifican en base 64
		data1.password = btoa(data1.password);
		data1.password_verify = btoa(data1.password_verify);
		data1.practice_list = data1.practice_list.name;
		data1.birthday = data1.birthday.getTime();

		//Servicio POST para crear cuenta
		$http.post(endpoint + type + '/Create', data1)
			.success(function(data) {
				if (!data.status) {
					swal({
						title: "",
						text: "Ha ocurrido un error, por favor inténtalo nuevamente.",
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var doc = data.response;
					var type = "doctor";
					var email = btoa(doc.email);
					//Redirección a formulario de confirmación de cuenta
					window.location = "/#/account_confirmation/" + type + "/" + email;
				}
			});
	};
}]);