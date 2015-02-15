var endpoint = "http://192.241.187.135:1414/api_1.0/";

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