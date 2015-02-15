///////////////////////////////////////////////////////////////////
//Module and Controllers for Doctor Dashboard - PARENT CONTROLLER//
///////////////////////////////////////////////////////////////////
var endpoint = "http://192.241.187.135:1414/api_1.0/";

docDash = angular.module('doctorDashboard', ['calendarDoctor']);
docDash.controller('DocDashboardController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService) {
	var type = 'Doctor';

	$('#doc-tab a, #account-tab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$('#doc-tab a[href="#/doctor_dashboard/{{docDashCtrl.info._id}}/#appointments"]').on('shown.bs.tab', function(e) {
		e.preventDefault();
		$(this).tab('show');
		$('#set-week').trigger("click");
	});

	$('#account-tab a[href="#/doctor_dashboard/{{docDashCtrl.info._id}}/#locations"]').on('shown.bs.tab', function(e) {
		e.preventDefault();
		var mapOptions = {
			zoom: 5,
			center: new google.maps.LatLng(4.6777333, -74.0956373),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		var initialMarker = [];
		$scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

		google.maps.event.addListener($scope.map, 'click', addPoint);

		//cargar ubicación en mapa
		var createMarker = function(lat, lng) {
			console.log('ENTRA A CREAR MARKER');
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(lat, lng),
				//title: info.name +' '+ info.lastname
			});
			initialMarker.push(marker);
		}
		doctorLat = $scope.doctorData.info.location_list[0].lat;
		doctorLon = $scope.doctorData.info.location_list[0].lon;
		createMarker(doctorLat, doctorLon);

		//añadir ubicación a mapa
		function addPoint(event) {
			var marker = new google.maps.Marker({
				position: event.latLng,
				map: $scope.map,
				//draggable: true
			});
			var markers = [];
			markers.push(marker);
			$scope.lat = event.latLng.lat();
			$scope.lng = event.latLng.lng();
			console.log($scope.doctorData.info.location_list);
			if ($scope.doctorData.info.location_list[0].lat && $scope.doctorData.info.location_list[0].lon) {
				initialMarker[0].setMap(null);
			};
			google.maps.event.addListener($scope.map, 'click', function() {
				marker.setMap(null);
				for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
				markers.splice(i, 1);
			});
		}

	});

	this.practices = [];
	$scope.insurances = [];

	var self = this;

	$scope.localidades = localidades;

	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		console.log(response.data);
		self.practices = response.data.response;
	});

	var promiseGetAllInsurances = InsurancesService.getAll();
	promiseGetAllInsurances.then(function(response) {
		console.log(response.data);
		$scope.insurances = response.data.response;
	});

	var myDate = new Date();
	var currentYear = myDate.getFullYear();
	this.yearsList = [];
	var loadYears = function() {
		for (var i = 0; i < ((currentYear + 1) - 1950); i++) {
			self.yearsList[i] = 1950 + i;
		};
		return self.yearsList;
	}
	loadYears();

	$scope.goToCalendar = function(docId) {
		window.location = "/#/calendar/" + docId;
	}

	$scope.cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Pereira", "Bucaramanga"];

	var id = $routeParams.id;

	$scope.doctorData = this;

	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron doctores", data.error);
				console.log(data);
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del doctor.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				// if successful, bind success message to message
				console.log("Resultado de busqueda de doctores:");
				$scope.doctorData.info = data.response;
				console.log($scope.doctorData.info);

				if ($scope.doctorData.info.education_list.length == 0) {
					$scope.doctorData.info.education_list.push({
						institute_name: '',
						degree: '',
						year_start: '',
						year_end: '',
						hilights: ''
					});
				};
				if ($scope.doctorData.info.education_list[0] == null || $scope.doctorData.info.education_list[0] == 0) {
					$scope.doctorData.info.education_list[0] = {
						institute_name: '',
						degree: '',
						year_start: '',
						year_end: '',
						hilights: ''
					};
				};
				if ($scope.doctorData.info.profesional_membership.length == 0) {
					$scope.doctorData.info.profesional_membership.push('');
				};
				if ($scope.doctorData.info.profesional_membership[0] == null) {
					$scope.doctorData.info.profesional_membership[0] = '';
				};
				if ($scope.doctorData.info.description == 'undefined') {
					$scope.doctorData.info.description = '';
				};
				if ($scope.doctorData.info.description == null) {
					$scope.doctorData.info.description = '';
				};
				if ($scope.doctorData.info.location_list.length == 0) {
					$scope.doctorData.info.location_list.push({
						location_name: '',
						location_address: '',
						lat: '',
						lon: ''
					});
				};
				if ($scope.doctorData.info.location_list[0] == null) {
					$scope.doctorData.info.location_list[0] = {
						location_name: '',
						location_address: '',
						lat: '',
						lon: ''
					};
				};
				if ($scope.doctorData.info.insurance_list.length == 0) {
					$scope.doctorData.info.insurance_list.push({
						insurance: '',
						insurance_type: ''
					});
				};
				if ($scope.doctorData.info.insurance_list[0] == null || $scope.doctorData.info.insurance_list[0] == 'undefined') {
					$scope.doctorData.info.insurance_list[0] = {
						insurance: '',
						insurance_type: ''
					};
				};

				var tempInsuranceList = [];

				for (var i = 0; i < $scope.doctorData.info.insurance_list.length; i++) {
					var tempInsurance = $scope.doctorData.info.insurance_list[i].insurance;
					var tempInsuranceType = $scope.doctorData.info.insurance_list[i].insurance_type;

					for (var j in $scope.insurances) {
						var insurance = $scope.insurances[j];
						if (insurance.name === tempInsurance) {
							var insuranceType = {};
							for (var k in insurance.type_list) {
								if (tempInsuranceType === insurance.type_list[k].name) {
									insuranceType = insurance.type_list[k];
									break;
								}
							}

							tempInsuranceList.push({
								insurance: insurance,
								insurance_type: insuranceType
							});
						}
					}
				}

				self.info.insurance_list = tempInsuranceList;
				console.log('insurancesList', self.info.insurance_list);
			}
		});
}]);

//Controller for Pictures - Doctor
docDash.directive('pictures', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/pictures.html',
		controller: 'DashboardPicturesController',
		controllerAs: 'dashPicturesCtrl',
	};
});
docDash.directive('fileModel', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);
docDash.service('fileUpload', ['$http', function($http) {
	this.uploadFileToUrl = function(file, uploadUrl) {
		var fd = new FormData();
		fd.append('image', file);
		$http.post(uploadUrl, fd, {
				transformRequest: angular.identity,
				headers: {
					'Content-Type': undefined
				}
			})
			.success(function() {
				var success_msg = 'Tu foto de perfil ha sido actualizada con éxito.';
				swal({
					title: "",
					text: success_msg,
					type: "success",
					confirmButtonText: "Aceptar",
				});
			})
			.error(function() {
				var error_msg = 'No se pudo actualizar tu foto de perfil, verifica la información de nuevo.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
			});
	}
}]);
docDash.controller('DashboardPicturesController', ['$scope', 'fileUpload', function($scope, fileUpload) {
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#profile-pic').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#image").change(function() {
		readURL(this);
	});

	var type = 'Doctor';
	$scope.uploadFile = function(doc_id) {
		var file = $scope.myFile;
		console.log('file is ' + JSON.stringify(file));
		var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
		fileUpload.uploadFileToUrl(file, uploadUrl);
	};

}]);

//Controller for change Password - Doctor     -->changePassword/id  password, new_password
docDash.directive('passwordChange', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/password_change.html',
		controller: 'DashboardPasswordController',
		controllerAs: 'dashPasswordCtrl',
	};
});
docDash.controller('DashboardPasswordController', ['$http', '$scope', function($http, $scope) {
	$scope.doctorData.security = {};
	var securityInfo = $scope.doctorData.security;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		securityInfo.password = btoa($scope.security.password);
		securityInfo.new_password = btoa($scope.security.new_password);

		$http.post(endpoint + type + '/ChangePassword/' + doc_id, securityInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudo actualizar tu contraseña, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data.response);
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

//Controller for Personal Info - Doctor
docDash.directive('personal', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/personal.html',
		controller: 'DashboardPersonalController',
		controllerAs: 'dashPersonalCtrl',
	};
});
docDash.controller('DashboardPersonalController', ['$http', '$scope', function($http, $scope) {
	$scope.doctorData.personalInfo = {};
	var personalInfo = $scope.doctorData.personalInfo;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		personalInfo.name = $scope.doctorData.info.name;
		personalInfo.lastname = $scope.doctorData.info.lastname;
		personalInfo.secondary_email = $scope.doctorData.info.secondary_email;
		if (personalInfo.birthday == 'undefined') {
			personalInfo.birthday = $scope.doctorData.info.birthday.getTime();
		};
		personalInfo.gender = $scope.doctorData.info.gender;
		personalInfo.patient_gender = $scope.doctorData.info.patient_gender;
		personalInfo.address = $scope.doctorData.info.address;
		personalInfo.phone = $scope.doctorData.info.phone;
		console.log(personalInfo);
		console.log(doc_id);

		$http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudieron actualizar tus datos personales, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data.response);
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

//Controller for studies and working information
docDash.directive('studies', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/studies.html',
		controller: 'DashboardStudiesController',
		controllerAs: 'dashStudiesCtrl',
	};
});
docDash.controller('DashboardStudiesController', ['$http', '$scope', function($http, $scope) {
	$scope.doctorData.studiesInfo = {};
	var studiesInfo = $scope.doctorData.studiesInfo;

	//var practices = $scope.practices;

	//add or remove practice form fields
	this.addPractice = function() {
		//console.log($scope.doctorData.info.practice_list[0]);
		$scope.doctorData.info.practice_list.push('');
	};
	this.removePractice = function(practiceToRemove) {
		var index = $scope.selectedPracticeList.indexOf(practiceToRemove);
		$scope.doctorData.info.practice_list.splice(index, 1);
		$scope.selectedPracticeList.splice(index, 1);
	};
	this.addStudiesInfo = function() {
		$scope.doctorData.info.education_list.push({
			institute_name: '',
			degree: '',
			year_start: '',
			year_end: '',
			hilights: ''
		});
	};
	this.removeStudiesInfo = function(studiesToRemove) {
		var index = $scope.doctorData.info.education_list.indexOf(studiesToRemove);
		$scope.doctorData.info.education_list.splice(index, 1);
	};
	this.initStudiesInfo = function() {
		var studies = $scope.doctorData.info.education_list;
	};
	this.addInsurance = function() {
		//console.log($scope.doctorData.info.insurance_list[0]);
		$scope.doctorData.info.insurance_list.push({
			insurance: ''
		});
	};
	this.removeInsurance = function(insuranceToRemove) {
		var index = $scope.doctorData.info.insurance_list.indexOf(insuranceToRemove);
		$scope.doctorData.info.insurance_list.splice(index, 1);
	};
	this.addMembership = function() {
		//console.log($scope.doctorData.info.practice_list[0]);
		$scope.doctorData.info.profesional_membership.push('');
	};
	this.removeMembership = function(membershipToRemove) {
		var index = $scope.doctorData.info.profesional_membership.indexOf(membershipToRemove);
		$scope.doctorData.info.profesional_membership.splice(index, 1);
	};

	var watched = {
		practices: {},
		practiceList: {},
		insurances: {},
		insurancesList: {},
	};

	var update = function(practices, practiceList) {
		if (!practices) return;
		if (!practiceList) return;
		if (practices) {
			for (var i in practices) {
				for (var j in practiceList) {
					if (practiceList[j] === practices[i].name) {
						$scope.selectedPracticeList[j] = practices[i];
					}
				}
			}
		}
	}
	$scope.selectedPracticeList = [];
	$scope.$watch('doctorData.practices', function(newValue, oldValue) {
		watched.practices = newValue;
		update(watched.practices, watched.practiceList);
	});

	$scope.$watch('doctorData.info.practice_list', function(newValue, oldValue) {
		watched.practiceList = newValue;
		update(watched.practices, watched.practiceList);
	});

	$scope.getInsurances = function(index) {
		return index.insurance.type_list;
	};

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		studiesInfo.practice_list = [];
		for (i = 0; i < $scope.selectedPracticeList.length; i++) {
			studiesInfo.practice_list.push($scope.selectedPracticeList[i]);
		}

		for (var i in studiesInfo.practice_list) {
			if (studiesInfo.practice_list[i] instanceof Array) {
				$('#practice_list_' + (parseInt(i) + 1)).removeClass('ng-valid');
				$('#practice_list_' + (parseInt(i) + 1)).removeClass('ng-pristine');
				$('#practice_list_' + (parseInt(i) + 1)).addClass('ng-invalid');
				$('#practice_list_' + (parseInt(i) + 1)).addClass('ng-dirty');
				return;
			}
		}

		var studiesInfoTemp = {};
		studiesInfoTemp.practice_list = [];
		for (var i = 0; i < studiesInfo.practice_list.length; i++) {
			studiesInfoTemp.practice_list.push(studiesInfo.practice_list[i].name);
		}

		studiesInfoTemp.education_list = {};
		studiesInfoTemp.education_list = $scope.doctorData.info.education_list;
		studiesInfoTemp.profesional_membership = [];
		studiesInfoTemp.profesional_membership = $scope.doctorData.info.profesional_membership;
		studiesInfoTemp.description = $scope.doctorData.info.description;

		studiesInfoTemp.insurance_list = [];
		for (var i = 0; i < $scope.doctorData.info.insurance_list.length; i++) {
			var tempInsurance = $scope.doctorData.info.insurance_list[i].insurance.name;
			var tempInsuranceType = $scope.doctorData.info.insurance_list[i].insurance_type.name;;
			studiesInfoTemp.insurance_list.push({
				insurance: tempInsurance,
				insurance_type: tempInsuranceType,
			});
		}
		//console.log(studiesInfoTemp.insurance_list);

		console.log(studiesInfoTemp);
		$http.post(endpoint + type + '/Update/' + doc_id, studiesInfoTemp)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudo actualizar tu formación académica, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data.response);
					var success_msg = 'Tus datos de formación académica han sido actualizados con éxito.';
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

//Controller for doctor locations
docDash.directive('locations', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/locations.html',
		controller: 'DashboardLocationsController',
		controllerAs: 'dashLocationsCtrl',
	};
});
docDash.controller('DashboardLocationsController', ['$http', '$scope', function($http, $scope) {
	$scope.doctorData.locationsInfo = {};
	var locationsInfo = $scope.doctorData.locationsInfo;

	var cities = $scope.cities;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		locationsInfo.city = $scope.doctorData.info.city;
		locationsInfo.localidad = $scope.doctorData.info.localidad;
		locationsInfo.location_list = {};
		locationsInfo.location_list = $scope.doctorData.info.location_list;
		locationsInfo.location_list[0].lat = $scope.lat;
		locationsInfo.location_list[0].lon = $scope.lng;
		console.log(locationsInfo);
		$http.post(endpoint + type + '/Update/' + doc_id, locationsInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudo actualizar tu ubicación, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(locationsInfo));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data.response);
					var success_msg = 'Tus datos de ubicación han sido actualizados con éxito!';
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

//Controller for doctor settings
docDash.directive('settings', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/settings.html',
		controller: 'DashboardSettingsController',
		controllerAs: 'dashSettingsCtrl',
	};
});
docDash.controller('DashboardSettingsController', ['$http', '$scope', function($http, $scope) {
	console.log('entra a settings');
	$scope.doctorData.settingsInfo = {};
	var settingsInfo = $scope.doctorData.settingsInfo;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		settingsInfo.settings = {};
		//settingsInfo.settings = $scope.doctorData.info.settings;

		settingsInfo.settings.email_appointment_notifications = $scope.doctorData.info.settings.email_appointment_notifications;
		if (settingsInfo.settings.email_appointment_notifications == undefined) {
			settingsInfo.settings.email_appointment_notifications = false;
		};
		settingsInfo.settings.email_marketing_notifications = $scope.doctorData.info.settings.email_marketing_notifications;
		if (settingsInfo.settings.email_marketing_notifications == undefined) {
			settingsInfo.settings.email_marketing_notifications = false;
		};
		settingsInfo.settings.mobile_appointment_notifications = $scope.doctorData.info.settings.mobile_appointment_notifications;
		if (settingsInfo.settings.mobile_appointment_notifications == undefined) {
			settingsInfo.settings.mobile_appointment_notifications = false;
		};
		settingsInfo.settings.mobile_marketing_notifications = $scope.doctorData.info.settings.mobile_marketing_notifications;
		if (settingsInfo.settings.mobile_marketing_notifications == undefined) {
			settingsInfo.settings.mobile_marketing_notifications = false;
		};
		console.log(settingsInfo);

		$http.post(endpoint + type + '/Update/' + doc_id, settingsInfo)
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


//Controller for Doctor Appointments
docDash.directive('appointments', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/appointments.html',
		controller: 'CalendarCtrl',
		controllerAs: 'calCtrl',
		scope: {
			doctorId: '=',
		}
	};
});