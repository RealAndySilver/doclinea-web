//Controladores para ventanas de términos y condiciones
//var endpoint = "http://192.241.187.135:1414/api_1.0/";

var terms = angular.module('termsModule', []);

terms.controller('DoctorTermsController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {
	
	//Si se cancela el proceso, cerrar ventana modal
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);