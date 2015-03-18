///////////////////////////////////////////////////////////////////
//Module and Controllers for Doctor Dashboard - PARENT CONTROLLER//
///////////////////////////////////////////////////////////////////
var endpoint = "http://doclinea.com:1414/api_1.0/";

docDash = angular.module('doctorDashboard', ['calendarDoctor']);
docDash.controller('DocDashboardController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService) {
	var type = 'Doctor';

	//Fix para que se muestre correctamente el contenido dentro del tab seleccionado
	$('#doc-tab a, #account-tab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	//Fix para mostrar tab de calendario
	$('#doc-tab a[href="#/doctor_dashboard/{{docDashCtrl.info._id}}/#appointments"]').on('shown.bs.tab', function(e) {
		e.preventDefault();
		$(this).tab('show');
		$('#set-week').trigger("click");
	});

	//Cargar mapa de Google Maps al entrar a Consultorio
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
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(lat, lng),
				//title: info.name +' '+ info.lastname
			});
			initialMarker.push(marker);
		}

		//Coordenadas con la ubicación del Doctor
		doctorLat = $scope.doctorData.info.location_list[0].lat;
		doctorLon = $scope.doctorData.info.location_list[0].lon;
		createMarker(doctorLat, doctorLon);

		//añadir ubicación a mapa
		function addPoint(event) {
			var marker = new google.maps.Marker({
				position: event.latLng,
				map: $scope.map,
			});
			var markers = [];
			markers.push(marker);
			$scope.lat = event.latLng.lat();
			$scope.lng = event.latLng.lng();
			if ($scope.doctorData.info.location_list[0].lat && $scope.doctorData.info.location_list[0].lon) {
				initialMarker[0].setMap(null);
			};

			//Validación para colocar solo un marcador en mapa a la misma vez
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

	//Carga de localidades de Bogotá
	$scope.localidades = localidades;

	//Cargar Especialidades de la API con los servicios globales de app.js
	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		self.practices = response.data.response;
	});

	//Cargar Aseguradoras de la API con los servicios globales de app.js
	var promiseGetAllInsurances = InsurancesService.getAll();
	promiseGetAllInsurances.then(function(response) {
		$scope.insurances = response.data.response;
	});

	//Generar Array con una lista de años a partir de 1950, para años de inicio y finalización de estudios
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

	//Link para sección de calendario 
	$scope.goToCalendar = function(docId) {
		window.location = "/#/calendar/" + docId;
	}

	//Array con Ciudades
	$scope.cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Pereira", "Bucaramanga"];

	//Capturar ID de la URL
	var id = $routeParams.id;

	$scope.doctorData = this;

	//Servicio que carga un Doctor por su ID
	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del doctor.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				$scope.doctorData.info = data.response;

				//Validaciones para inicializar campos vacios en los formularios cuandos esten indefinidos o NULL
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

				//Función para cargar Aseguradoras de Doctor con sus respectivos Seguros
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
			}
		});
}]);

//Directiva y Controlador para editar la foto de perfil de Doctor
docDash.directive('pictures', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/pictures.html',
		controller: 'DashboardPicturesController',
		controllerAs: 'dashPicturesCtrl',
	};
});

//Directiva que captura el input type file para el modelo 
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

//Servicio POST para actualizar la foto de perfil del Doctor
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
			.error(function(data) {
				var error_msg = 'No se pudo actualizar tu foto de perfil, verifica la información de nuevo.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
				console.log(data);
			});
	}
}]);

//Controlador que previsualiza la foto de perfil cuando se actualiza y se carga una nueva
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

	//Aquí se llama al servicio que actualiza la foto de perfil
	var type = 'Doctor';
	$scope.uploadFile = function(doc_id) {
		var file = $scope.myFile;
		console.log('file is ' + JSON.stringify(file));
		var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
		fileUpload.uploadFileToUrl(file, uploadUrl);
	};

}]);

//Directiva y Controlador para editar la contraseña de Doctor
docDash.directive('passwordChange', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/password_change.html',
		controller: 'DashboardPasswordController',
		controllerAs: 'dashPasswordCtrl',
	};
});
docDash.controller('DashboardPasswordController', ['$http', '$scope', function($http, $scope) {
	//Objeto securityInfo para guardar la información que se va a editar
	$scope.doctorData.security = {};
	var securityInfo = $scope.doctorData.security;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		//Las contraseñas del formulario se codifican en base64
		securityInfo.password = btoa($scope.security.password);
		securityInfo.new_password = btoa($scope.security.new_password);

		//Servicio POST para actualizar la contraseña de un Doctor
		$http.post(endpoint + type + '/ChangePassword/' + doc_id, securityInfo)
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

//Directiva y Controlador para editar información personal de Doctor
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

	//Función para actualizar información personal de Doctor
	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		//Objeto PersonalInfo para guardar la información que se va a editar
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

		//Servicio POST para actualizar la información personal de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
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

//Directiva y Controlador para editar la información académica de Doctor
docDash.directive('studies', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/studies.html',
		controller: 'DashboardStudiesController',
		controllerAs: 'dashStudiesCtrl',
	};
});
docDash.controller('DashboardStudiesController', ['$http', '$scope', function($http, $scope) {
	//Objeto studiesInfo para guardar la información que se va a editar
	$scope.doctorData.studiesInfo = {};
	var studiesInfo = $scope.doctorData.studiesInfo;

	//Cargar las especialidades
	//var practices = $scope.practices;

	//Agregar un campo de Especialidad en el formulario
	this.addPractice = function() {
		$scope.doctorData.info.practice_list.push('');
	};

	//Remover un campo de Especialidad en el formulario
	this.removePractice = function(practiceToRemove) {
		var index = $scope.selectedPracticeList.indexOf(practiceToRemove);
		$scope.doctorData.info.practice_list.splice(index, 1);
		$scope.selectedPracticeList.splice(index, 1);
	};

	//Agregar campos de Formación Académica al formulario
	this.addStudiesInfo = function() {
		$scope.doctorData.info.education_list.push({
			institute_name: '',
			degree: '',
			year_start: '',
			year_end: '',
			hilights: ''
		});
	};

	//Remover campos de Formación Académica en el formulario
	this.removeStudiesInfo = function(studiesToRemove) {
		var index = $scope.doctorData.info.education_list.indexOf(studiesToRemove);
		$scope.doctorData.info.education_list.splice(index, 1);
	};
	this.initStudiesInfo = function() {
		var studies = $scope.doctorData.info.education_list;
	};

	//Agregar un campo de Aseguradora al formulario
	this.addInsurance = function() {
		$scope.doctorData.info.insurance_list.push({
			insurance: ''
		});
	};

	//Remover un campo de Aseguradora en el formulario
	this.removeInsurance = function(insuranceToRemove) {
		var index = $scope.doctorData.info.insurance_list.indexOf(insuranceToRemove);
		$scope.doctorData.info.insurance_list.splice(index, 1);
	};

	//Agregar un campo de Membresía al formulario
	this.addMembership = function() {
		$scope.doctorData.info.profesional_membership.push('');
	};

	//Remover un campo de Membresía en el formulario
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

	//Función para cargar Seguros según el índice de la Aseguradora
	$scope.getInsurances = function(index) {
		return index.insurance.type_list;
	};

	//Función para editar la información académica de Doctor
	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		studiesInfo.practice_list = [];
		for (i = 0; i < $scope.selectedPracticeList.length; i++) {
			studiesInfo.practice_list.push($scope.selectedPracticeList[i]);
		}

		for (var i in studiesInfo.practice_list) {
			if (studiesInfo.practice_list[i] instanceof Array) {
				//Validación para especialidad requerida
				$('#practice_list_' + (parseInt(i) + 1)).removeClass('ng-valid');
				$('#practice_list_' + (parseInt(i) + 1)).removeClass('ng-pristine');
				$('#practice_list_' + (parseInt(i) + 1)).addClass('ng-invalid');
				$('#practice_list_' + (parseInt(i) + 1)).addClass('ng-dirty');
				return;
			}
		}

		//Objeto studiesInfoTemp que guarda la información que se va a editar
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

		//ARRAY donde se guardan Objetos de pares de Aseguradoras y Seguros
		studiesInfoTemp.insurance_list = [];
		for (var i = 0; i < $scope.doctorData.info.insurance_list.length; i++) {
			var tempInsurance = $scope.doctorData.info.insurance_list[i].insurance.name;
			var tempInsuranceType = $scope.doctorData.info.insurance_list[i].insurance_type.name;;
			studiesInfoTemp.insurance_list.push({
				insurance: tempInsurance,
				insurance_type: tempInsuranceType,
			});
		}

		//Servicio POST para actualizar información académica de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, studiesInfoTemp)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo actualizar tu formación académica, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
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

//Directiva y Controlador para editar ubicación de Doctor
docDash.directive('locations', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/locations.html',
		controller: 'DashboardLocationsController',
		controllerAs: 'dashLocationsCtrl',
	};
});
docDash.controller('DashboardLocationsController', ['$http', '$scope', function($http, $scope) {
	//Objeto locationsInfo que guarda la información que se va a editar
	$scope.doctorData.locationsInfo = {};
	var locationsInfo = $scope.doctorData.locationsInfo;

	//Carga de Ciudades
	var cities = $scope.cities;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		locationsInfo.city = $scope.doctorData.info.city;
		locationsInfo.localidad = $scope.doctorData.info.localidad;

		//location_list es un objeto donde se adicionan las coordenadas del mapa 
		locationsInfo.location_list = {};
		locationsInfo.location_list = $scope.doctorData.info.location_list;
		locationsInfo.location_list[0].lat = $scope.lat;
		locationsInfo.location_list[0].lon = $scope.lng;

		//Servicio POST para actualizar la ubicación de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, locationsInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo actualizar tu ubicación, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
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

//Directiva y Controlador para editar ajustes de notificaciones de Doctor
docDash.directive('settings', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/doctor/settings.html',
		controller: 'DashboardSettingsController',
		controllerAs: 'dashSettingsCtrl',
	};
});
docDash.controller('DashboardSettingsController', ['$http', '$scope', function($http, $scope) {
	//Objeto settingsInfo que guarda la información que se va a editar
	$scope.doctorData.settingsInfo = {};
	var settingsInfo = $scope.doctorData.settingsInfo;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		settingsInfo.settings = {};

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

		//Servicio POST para actualizar ajustes de notificaciones de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, settingsInfo)
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


//Directiva para Calendario de Doctor, el controlador se encuentra en calendarDoctor.js
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