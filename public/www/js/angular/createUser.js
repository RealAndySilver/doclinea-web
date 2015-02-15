var endpoint = "http://192.241.187.135:1414/api_1.0/";

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