//Controller for Modal
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