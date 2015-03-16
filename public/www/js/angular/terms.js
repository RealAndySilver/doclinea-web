//Controladores para ventanas de términos y condiciones
var terms = angular.module('termsModule', []);

terms.controller('DoctorTermsController', ['$http', '$routeParams', '$modalInstance', '$scope', function($http, $routeParams, $modalInstance, $scope) {
	
	//Si se cancela el proceso, cerrar ventana modal
	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

}]);