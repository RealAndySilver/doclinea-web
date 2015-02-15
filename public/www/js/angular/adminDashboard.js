//////////////////////////////////////////////
//Modulo y Controladores para Administración//
//////////////////////////////////////////////

var endpoint = "http://192.241.187.135:1414/api_1.0/";

//JSON con Localidades de Bogotá
var localidades = [{
	name: "Antonio Nariño",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Barrios Unidos",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Bosa",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Chapinero",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Ciudad Bolivar",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Engativá",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Fontibón",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Keneddy",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "La Candelaria",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Los Mártires",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Puente Aranda",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Rafael Uribe",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "San Cristóbal",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Santa Fe",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Suba",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Sumapaz",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Teusaquillo",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Tunjuelito",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Usaquén",
	lat: 4.5,
	lon: 74.5,
}, {
	name: "Usme",
	lat: 4.5,
	lon: 74.5,
}, ];

adminDash = angular.module('adminDashboard', []);

//Controlador Principal para Módulo de Administración
adminDash.controller('AdminDashboardController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService) {
	this.practices = [];
	this.insurances = [];

	var self = this;

	//Cargar Especialidades de la API con los servicios globales de app.js
	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		self.practices = response.data.response;
	});

	//Cargar Aseguradoras de la API con los servicios globales de app.js
	var promiseGetAllInsurances = InsurancesService.getAll();
	promiseGetAllInsurances.then(function(response) {
		self.insurances = response.data.response;
	});

	//JSON con Ciudades 
	this.cities = [{
		name: "Bogotá",
		id: 1
	}, {
		name: "Medellín",
		id: 2
	}, {
		name: "Cali",
		id: 3
	}, {
		name: "Barranquilla",
		id: 4
	}, {
		name: "Pereira",
		id: 5
	}, {
		name: "Bucaramanga",
		id: 6
	}];

	//Fix para que se muestre correctamente el contenido dentro del tab seleccionado
	$('#admin-tab a, #myTab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});
}]);

//Directiva y Controlador para Búsqueda de Doctores 
adminDash.directive('filters', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/filters.html',
		controller: 'SearchDoctorsController',
		controllerAs: 'searchDocsCtrl',
	};
});
adminDash.controller('SearchDoctorsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	//Mostrar valor indefinido en la URL cuando falte algún parámetro de búsqueda
	var encodedParam = btoa("undefined");
	var params = {};

	//Validación de los parámetros de búsqueda
	this.getDoctors = function() {

		if ($scope.searchDocsCtrl.practice == undefined || $scope.searchDocsCtrl.practice == null) {
			delete params.practice;
		} else {
			params.practice_list = $scope.searchDocsCtrl.practice.name;
		}
		if ($scope.searchDocsCtrl.city == undefined || $scope.searchDocsCtrl.city == null) {
			delete params.city;
		} else {
			params.city = $scope.searchDocsCtrl.city.name;
		}
		if ($scope.searchDocsCtrl.insurance == undefined || $scope.searchDocsCtrl.insurance == null) {
			delete params.insurance;
		} else {
			params.insurance_list = $scope.searchDocsCtrl.insurance;
		}
		if ($scope.searchDocsCtrl.localidad == undefined || $scope.searchDocsCtrl.localidad == null) {
			delete params.localidad;
		} else {
			params.localidad = $scope.searchDocsCtrl.localidad.name;
		}

		//Iniciar loading
		$('#docs-list').show();

		//Servicio para obtener doctores según parámetros de búsqueda
		$http.post(endpoint + 'Doctor' + '/GetByParams', params)
			.success(function(data) {
				if (!data.status) {
					//Ocultar lista de búsqueda si no se encuentran doctores
					$('#docs-list').hide();
					$(".doc-box").css('visibility', 'hidden');
					swal({
						title: "",
						text: "No se encontraron doctores con los criteros de búsqueda introducidos, vuelve a intentarlo.",
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					//Finalizar loading
					$('#docs-list').hide();
					$scope.doctors = data.response
				}
			});
	};
}]);

//Directiva y Controlador para editar información de Doctores
adminDash.directive('doctors', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctors.html',
	};
});
adminDash.controller('DoctorsManagementController', ['$http', '$scope', '$routeParams', '$location', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, $location, PracticesService, InsurancesService) {
	//Fix para que se muestre correctamente el contenido dentro del tab seleccionado
	$('#doc-dash a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	//Link para volver a principio de módulo de Administración
	$scope.toAdminDashboard = function() {
		$location.url('/admin_dashboard');
	};

	//Cargar mapa de Google Maps al entrar a Consultorio
	$('#doc-dash a[href="#/admin_dashboard/edit_doctor/{{docManageCtrl.info._id}}/#locations"]').on('shown.bs.tab', function(e) {
		e.preventDefault();
		var mapOptions = {
			zoom: 5,
			center: new google.maps.LatLng(4.6777333, -74.0956373),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}

		var initialMarker = [];
		$scope.map = new google.maps.Map(document.getElementById('location-map'), mapOptions);

		google.maps.event.addListener($scope.map, 'click', addPoint);

		//Cargar ubicación en mapa
		var createMarker = function(lat, lng) {
			console.log('ENTRA A CREAR MARKER');
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(lat, lng),
				title: info.name + ' ' + info.lastname,
			});
			initialMarker.push(marker);
		}

		//Coordenadas con la ubicación del Doctor
		doctorLat = $scope.docInfo.info.location_list[0].lat;
		doctorLon = $scope.docInfo.info.location_list[0].lon;
		createMarker(doctorLat, doctorLon);

		//Añadir ubicación a mapa
		function addPoint(event) {
			var marker = new google.maps.Marker({
				position: event.latLng,
				map: $scope.map,
			});
			var markers = [];
			markers.push(marker);
			$scope.lat = event.latLng.lat();
			$scope.lng = event.latLng.lng();
			if ($scope.docInfo.info.location_list[0].lat && $scope.docInfo.info.location_list[0].lon) {
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
	$scope.yearsList = [];
	var loadYears = function() {
		for (var i = 0; i < ((currentYear + 1) - 1950); i++) {
			$scope.yearsList[i] = 1950 + i;
		};
		return $scope.yearsList;
	}
	loadYears();

	//Array con Ciudades
	$scope.cities = ["Bogotá", "Medellín", "Cali", "Barranquilla", "Pereira", "Bucaramanga"];

	//Capturar ID de la URL
	var id = $routeParams.id;

	$scope.docInfo = this;

	//Servicio que carga un Doctor por su ID
	$http.get(endpoint + 'Doctor' + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				swal({
					title: "Error de Servidor",
					text: "Ha ocurrido un error al cargar la información del doctor.",
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				$scope.docInfo.info = data.response;

				//Validaciones para inicializar campos vacios en los formularios cuandos esten indefinidos o NULL
				if ($scope.docInfo.info.education_list.length == 0) {
					$scope.docInfo.info.education_list.push({
						institute_name: '',
						degree: '',
						year_start: '',
						year_end: '',
						hilights: ''
					});
				};
				if ($scope.docInfo.info.profesional_membership.length == 0) {
					$scope.docInfo.info.profesional_membership.push('');
				};
				if ($scope.docInfo.info.profesional_membership[0] == null) {
					$scope.docInfo.info.profesional_membership[0] = '';
				};
				if ($scope.docInfo.info.description == 'undefined') {
					$scope.docInfo.info.description = '';
				};
				if ($scope.docInfo.info.description == null) {
					$scope.docInfo.info.description = '';
				};
				if ($scope.docInfo.info.location_list.length == 0) {
					$scope.docInfo.info.location_list.push({
						location_name: '',
						location_address: '',
						lat: '',
						lon: ''
					});
				};
				if ($scope.docInfo.info.location_list[0] == null) {
					$scope.docInfo.info.location_list[0] = {
						location_name: '',
						location_address: '',
						lat: '',
						lon: ''
					};
				};
				if ($scope.docInfo.info.insurance_list.length == 0) {
					$scope.docInfo.info.insurance_list.push({
						insurance: '',
						insurance_type: ''
					});
				};
				if ($scope.docInfo.info.insurance_list[0] == null || $scope.docInfo.info.insurance_list[0] == 'undefined') {
					$scope.docInfo.info.insurance_list[0] = {
						insurance: '',
						insurance_type: ''
					};
				};
				var tempInsuranceList = [];

				//Función para cargar Aseguradoras de Doctor con sus respectivos Seguros
				for (var i = 0; i < $scope.docInfo.info.insurance_list.length; i++) {
					var tempInsurance = $scope.docInfo.info.insurance_list[i].insurance;
					var tempInsuranceType = $scope.docInfo.info.insurance_list[i].insurance_type;

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

//Directiva y Controlador para editar información personal de Doctor
adminDash.directive('docPersonal', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctor_personal.html',
		controller: 'ManageDocPersonalController',
		controllerAs: 'docPersonalManageCtrl',
	};
});
adminDash.controller('ManageDocPersonalController', ['$http', '$scope', function($http, $scope) {
	$scope.docInfo.personalInfo = {};
	var personalInfo = $scope.docInfo.personalInfo;

	//Función para actualizar información personal de Doctor
	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		//Objeto PersonalInfo para guardar la información que se va a editar
		personalInfo.name = $scope.docInfo.info.name;
		personalInfo.lastname = $scope.docInfo.info.lastname;
		personalInfo.email = $scope.docInfo.info.email;
		if (personalInfo.birthday == 'undefined') {
			personalInfo.birthday = $scope.docInfo.info.birthday.getTime();
		};
		personalInfo.birthday = $scope.docInfo.info.birthday.getTime();
		personalInfo.secondary_email = $scope.docInfo.info.secondary_email;
		personalInfo.gender = $scope.docInfo.info.gender;
		personalInfo.patient_gender = $scope.docInfo.info.patient_gender;
		personalInfo.address = $scope.docInfo.info.address;
		personalInfo.phone = $scope.docInfo.info.phone;

		//Servicio POST para actualizar la información personal de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, personalInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudieron actualizar los datos personales, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'Los datos personales han sido actualizados con éxito!';
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


//Directiva y Controlador para editar la foto de perfil de Doctor
adminDash.directive('docPictures', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctor_pictures.html',
		controller: 'ManageDocPictureController',
		controllerAs: 'docPicManageCtrl',
	};
});

//Directiva que captura el input type file para el modelo 
adminDash.directive('doctorPic', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.doctorPic);
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
adminDash.service('fileUpload', ['$http', function($http) {
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
				var success_msg = 'La foto de perfil ha sido actualizada con éxito.';
				swal({
					title: "",
					text: success_msg,
					type: "success",
					confirmButtonText: "Aceptar",
				});
			})
			.error(function() {
				var error_msg = 'No se pudo actualizar la foto de perfil, verifica la información de nuevo.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
			});
	}
}]);

//Controlador que previsualiza la foto de perfil cuando se actualiza y se carga una nueva
adminDash.controller('ManageDocPictureController', ['$scope', 'fileUpload', function($scope, fileUpload) {
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#doc-pic').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#doc-image").change(function() {
		readURL(this);
	});

	//Aquí se llama al servicio que actualiza la foto de perfil
	var type = 'Doctor';
	$scope.uploadPic = function(doc_id) {
		var file = $scope.myFile;
		var uploadUrl = endpoint + type + '/UpdateProfilePic/' + doc_id;
		fileUpload.uploadFileToUrl(file, uploadUrl);
	};

}]);


//Directiva y Controlador para editar la contraseña de Doctor
adminDash.directive('docPassword', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctor_password.html',
		controller: 'ManageDocPasswordController',
		controllerAs: 'docPasswordManageCtrl',
	};
});
adminDash.controller('ManageDocPasswordController', ['$http', '$scope', function($http, $scope) {
	//Objeto securityInfo para guardar la información que se va a editar
	$scope.docInfo.security = {};
	var securityInfo = $scope.docInfo.security;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		//Las contraseñas del formulario se codifican en base64
		securityInfo.password = btoa($scope.security.password);
		securityInfo.new_password = btoa($scope.security.new_password);

		//Servicio POST para actualizar la contraseña de un Doctor
		$http.post(endpoint + type + '/ChangePassword/' + doc_id, securityInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo actualizar la contraseña, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'La contraseña ha sido cambiada con éxito!';
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
adminDash.directive('docStudies', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctor_studies.html',
		controller: 'ManageDocStudiesController',
		controllerAs: 'docStudiesManageCtrl',
	};
});
adminDash.controller('ManageDocStudiesController', ['$http', '$scope', function($http, $scope) {
	//Objeto studiesInfo para guardar la información que se va a editar
	$scope.docInfo.studiesInfo = {};
	var studiesInfo = $scope.docInfo.studiesInfo;

	//Cargar las especialidades
	var practices = $scope.practices;

	//Agregar un campo de Especialidad en el formulario
	this.addPractice = function() {
		$scope.docInfo.info.practice_list.push(practices);
	};

	//Remover un campo de Especialidad en el formulario
	this.removePractice = function(practiceToRemove) {
		var index = $scope.selectedPracticeList.indexOf(practiceToRemove);
		$scope.docInfo.info.practice_list.splice(index, 1);
		$scope.selectedPracticeList.splice(index, 1);
	};

	//Agregar campos de Formación Académica al formulario
	this.addStudiesInfo = function() {
		$scope.docInfo.info.education_list.push({
			institute_name: '',
			degree: '',
			year_start: '',
			year_end: '',
			hilights: ''
		});
	};

	//Remover campos de Formación Académica en el formulario
	this.removeStudiesInfo = function(studiesToRemove) {
		var index = $scope.docInfo.info.education_list.indexOf(studiesToRemove);
		$scope.docInfo.info.education_list.splice(index, 1);
	};
	this.initStudiesInfo = function() {
		var studies = $scope.docInfo.info.education_list;
	};

	//Agregar un campo de Aseguradora al formulario
	this.addInsurance = function() {
		$scope.docInfo.info.insurance_list.push({
			insurance: ''
		});
	};

	//Remover un campo de Aseguradora en el formulario
	this.removeInsurance = function(insuranceToRemove) {
		var index = $scope.docInfo.info.insurance_list.indexOf(insuranceToRemove);
		$scope.docInfo.info.insurance_list.splice(index, 1);
	};

	//Agregar un campo de Membresía al formulario
	this.addMembership = function() {
		$scope.docInfo.info.profesional_membership.push('');
	};

	//Remover un campo de Membresía en el formulario
	this.removeMembership = function(membershipToRemove) {
		var index = $scope.docInfo.info.profesional_membership.indexOf(membershipToRemove);
		$scope.docInfo.info.profesional_membership.splice(index, 1);
	};

	var watched = {
		practices: {},
		practiceList: {},
	};

	//Función para cargar Seguros según el índice de la Aseguradora
	$scope.getInsurances = function(index) {
		return index.insurance.type_list;
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

	//Cargar las especialidades en los campos respectivos del formulario
	$scope.selectedPracticeList = [];
	$scope.$watch('docInfo.practices', function(newValue, oldValue) {
		watched.practices = newValue;
		update(watched.practices, watched.practiceList);
	});

	$scope.$watch('docInfo.info.practice_list', function(newValue, oldValue) {
		watched.practiceList = newValue;
		update(watched.practices, watched.practiceList);
	});

	//Función para editar la información académica de Doctor
	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		//Guarda en un ARRAY las especialidades seleccionadas
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
		studiesInfoTemp.education_list = $scope.docInfo.info.education_list;
		studiesInfoTemp.profesional_membership = [];
		studiesInfoTemp.profesional_membership = $scope.docInfo.info.profesional_membership;
		studiesInfoTemp.description = $scope.docInfo.info.description;

		//ARRAY donde se guardan Objetos de pares de Aseguradoras y Seguros
		studiesInfoTemp.insurance_list = [];
		for (var i = 0; i < $scope.docInfo.info.insurance_list.length; i++) {
			var tempInsurance = $scope.docInfo.info.insurance_list[i].insurance.name;
			var tempInsuranceType = $scope.docInfo.info.insurance_list[i].insurance_type.name;;
			studiesInfoTemp.insurance_list.push({
				insurance: tempInsurance,
				insurance_type: tempInsuranceType,
			});
		}

		//Servicio POST para actualizar información académica de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, studiesInfoTemp)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo actualizar la formación académica, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'Los datos de formación académica han sido actualizados con éxito!';
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
adminDash.directive('docLocations', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctor_locations.html',
		controller: 'ManageDocLocationsController',
		controllerAs: 'docLocationsManageCtrl',
	};
});
adminDash.controller('ManageDocLocationsController', ['$http', '$scope', function($http, $scope) {
	//Objeto locationsInfo que guarda la información que se va a editar
	$scope.docInfo.locationsInfo = {};
	var locationsInfo = $scope.docInfo.locationsInfo;

	//Carga de Ciudades
	var cities = $scope.cities;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		locationsInfo.city = $scope.docInfo.info.city;
		locationsInfo.localidad = $scope.docInfo.info.localidad;

		//location_list es un objeto donde se adicionan las coordenadas del mapa 
		locationsInfo.location_list = {};
		locationsInfo.location_list = $scope.docInfo.info.location_list;
		locationsInfo.location_list[0].lat = $scope.lat;
		locationsInfo.location_list[0].lon = $scope.lng;
		console.log(locationsInfo);

		//Servicio POST para actualizar la ubicación de Doctor
		$http.post(endpoint + type + '/Update/' + doc_id, locationsInfo)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo actualizar la ubicación, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'Los datos de ubicación han sido actualizados con éxito!';
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
//Controller for Settings - Doctor by Admin
adminDash.directive('docSettings', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/doctor_settings.html',
		controller: 'ManageDocSettingsController',
		controllerAs: 'docSettingsManageCtrl',
	};
});
adminDash.controller('ManageDocSettingsController', ['$http', '$scope', function($http, $scope) {
	console.log('entra a settings');
	$scope.docInfo.settingsInfo = {};
	var settingsInfo = $scope.docInfo.settingsInfo;

	this.updateDoctor = function(doc_id) {
		var type = 'Doctor';

		settingsInfo.settings = {};
		//settingsInfo.settings = $scope.docInfo.info.settings;

		settingsInfo.settings.email_appointment_notifications = $scope.docInfo.info.settings.email_appointment_notifications;
		if (settingsInfo.settings.email_appointment_notifications == undefined) {
			settingsInfo.settings.email_appointment_notifications = false;
		};
		settingsInfo.settings.email_marketing_notifications = $scope.docInfo.info.settings.email_marketing_notifications;
		if (settingsInfo.settings.email_marketing_notifications == undefined) {
			settingsInfo.settings.email_marketing_notifications = false;
		};
		settingsInfo.settings.mobile_appointment_notifications = $scope.docInfo.info.settings.mobile_appointment_notifications;
		if (settingsInfo.settings.mobile_appointment_notifications == undefined) {
			settingsInfo.settings.mobile_appointment_notifications = false;
		};
		settingsInfo.settings.mobile_marketing_notifications = $scope.docInfo.info.settings.mobile_marketing_notifications;
		if (settingsInfo.settings.mobile_marketing_notifications == undefined) {
			settingsInfo.settings.mobile_marketing_notifications = false;
		};
		console.log(settingsInfo);

		$http.post(endpoint + type + '/Update/' + doc_id, settingsInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					//console.log(JSON.stringify(data1));
					var error_msg = 'No se pudieron actualizar las notificaciones, verifique la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Listo, usuario actualizado", data.response);
					var success_msg = 'Las notificaciones han sido actualizadas con éxito!';
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
//Controller for Hospitals - Seccions in Admin
adminDash.directive('hospitals', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/hospitals.html',
		controller: 'AdminHospitalsController',
		controllerAs: 'hospitalsCtrl',
	};
});
adminDash.controller('AdminHospitalsController', ['$http', '$scope', function($http, $scope) {
	//console.log('THIS IS HOSPITALS');
	var type = 'Hospital';

	this.createHospital = function() {
		//console.log('THIS IS CREATE HOSPITALS');
		var data1 = this.info;

		console.log('datos para crear hospital');
		console.log(data1);

		$http.post(endpoint + type + '/Create', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se creó", data);
					var error_msg = 'No se pudo agregar el hospital, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Listo, hospital creado", data);
					var success_msg = 'El hospital ha sido creado con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
					$("form #name").val('');
					$("form #email").val('');
				}
			});
		this.data = {};
	};

	this.showHospitals = function() {
		var This = this;
		$http.get(endpoint + type + '/GetAll')
			.success(function(data) {
				if (!data.status) {
					console.log("No se encontraron hospitales", data);
					var error_msg = 'Ha ocurrido un error al cargar la lista de hospitales.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Lista de hospitales");
					console.log(data);
					$scope.hospitals = data.response;
				}
			});
	};

	this.deleteHospital = function(id) {
		console.log(id);
		data1 = {};
		data1.id = id;
		console.log(data1);
		$http.post(endpoint + type + '/Delete', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se pudo eliminar el hospital", data);
					var error_msg = 'Ha ocurrido un error al intentar eliminar el hospital.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Hospital eliminado exitosamente.");
					console.log(data);
					var index = $scope.hospitals.indexOf(data1.id);
					$scope.hospitals.splice(index, 1);
					var success = 'El hospital ha sido eliminado con éxito.';
					swal({
						title: "",
						text: success,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}
			});
	};
}]);
//Controller for Hospital Management in Admin Dashboard
adminDash.controller('HospitalsManagementController', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
	$('#hospi-tab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	$scope.toHospitals = function() {
		$location.url('/admin_dashboard/#sections');
	};

	$('#hospi-tab a[href="#/admin_dashboard/edit_hospital/{{hospitalManageCtrl.info._id}}/#hospital_location"]').on('shown.bs.tab', function(e) {
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
			//console.log('ENTRA A CREAR MARKER');
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(lat, lng),
				//title: info.name +' '+ info.lastname
			});
			initialMarker.push(marker);
			// marker.content = '<div class="infoWindowContent"><div class="map-inner-info"><h4>' + info.practice_list[0] + '</h4><br><h4>' + info.address + '</h4><br><a href="#/" class="btn btn-success">Pedir cita</a></div></div>';

			// google.maps.event.addListener(marker, 'click', function(){
			// 	infoWindow.setContent('<h3>' + marker.title + '</h3>' + marker.content);
			// 	infoWindow.open($scope.map, marker);
			// });
		}
		hospitalLat = $scope.hospitalInfo.info.location_list[0].lat;
		hospitalLon = $scope.hospitalInfo.info.location_list[0].lon;
		createMarker(hospitalLat, hospitalLon);

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
			console.log($scope.hospitalInfo.info.location_list);
			if ($scope.hospitalInfo.info.location_list[0].lat && $scope.hospitalInfo.info.location_list[0].lon) {
				initialMarker[0].setMap(null);
			};
			google.maps.event.addListener($scope.map, 'click', function() {
				marker.setMap(null);
				for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
				markers.splice(i, 1);
			});
		}

	});

	var id = $routeParams.id;
	var type = "Hospital";

	$scope.hospitalInfo = this;

	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron hospitales", data.error);
				var error_msg = 'Ha ocurrido un error al intentar cargar el hospital.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
				console.log(data);
			} else {
				// if successful, bind success message to message
				console.log("Resultado de busqueda de hospitales:");
				$scope.hospitalInfo.info = data.response;
				console.log($scope.hospitalInfo.info);

				if ($scope.hospitalInfo.info.location_list.length == 0) {
					$scope.hospitalInfo.info.location_list.push({
						address: ''
					});
				};
			}
		});
}]);
//Controller for Basic Info - Admin Hospitals
adminDash.directive('basicHospital', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/hospital/basic.html',
		controller: 'BasicHospitalController',
		controllerAs: 'basicHospitalCtrl',
	};
});
adminDash.controller('BasicHospitalController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var type = "Hospital";
	$scope.hospitalInfo.basicInfo = {};
	var basicInfo = $scope.hospitalInfo.basicInfo;
	this.updateHospital = function(hospital_id) {

		basicInfo.name = $scope.hospitalInfo.info.name;
		basicInfo.email = $scope.hospitalInfo.info.email;
		console.log(basicInfo);

		$http.post(endpoint + type + '/Update/' + hospital_id, basicInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudo actualizar la información del hospital, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data);
					var success_msg = 'La información del hospital ha sido actualizada con éxito!';
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
//Controller for Logo - Admin Hospitals
adminDash.directive('hospitalLogo', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/hospital/logo.html',
		controller: 'LogoHospitalController',
		controllerAs: 'logoHospitalCtrl',
	};
});
adminDash.directive('hospitalFile', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.hospitalFile);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);
adminDash.service('hospitalUpload', ['$http', function($http) {
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
				var success_msg = 'El logo del hospital ha sido actualizado con éxito.';
				swal({
					title: "",
					text: success_msg,
					type: "success",
					confirmButtonText: "Aceptar",
				});
			})
			.error(function() {
				var error_msg = 'No se pudo actualizar el logo del hospital.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
			});
	}
}]);
adminDash.controller('LogoHospitalController', ['$http', '$scope', '$routeParams', 'hospitalUpload', function($http, $scope, $routeParams, hospitalUpload) {
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#hospital-logo').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#image").change(function() {
		readURL(this);
	});

	var type = 'Hospital';
	$scope.uploadFile = function(hospital_id) {
		var file = $scope.myFile;
		console.log('file is ' + JSON.stringify(file));
		var uploadUrl = endpoint + type + '/UpdatePic/' + hospital_id;
		hospitalUpload.uploadFileToUrl(file, uploadUrl);
	};
}]);
//Controller for Location - Admin Hospitals
adminDash.directive('locationHospital', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/hospital/location.html',
		controller: 'LocationHospitalController',
		controllerAs: 'locationHospitalCtrl',
	};
});
adminDash.controller('LocationHospitalController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var type = "Hospital";
	$scope.hospitalInfo.location = {};
	var location = $scope.hospitalInfo.location;
	this.updateHospital = function(hospital_id) {

		location.location_list = {};
		location.location_list.address = $scope.hospitalInfo.info.location_list[0].address;
		location.location_list.lat = $scope.lat;
		location.location_list.lon = $scope.lng;
		//console.log(location);

		$http.post(endpoint + type + '/Update/' + hospital_id, location)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se puedo actualizar la ubicación del hospital.';
					swal({
						title: "",
						text: success_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data);
					var success_msg = 'La ubicación del hospital ha sido actualizada con éxito!';
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
//Controller for Insurances - Seccions in Admin
adminDash.directive('insurances', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/insurances.html',
		controller: 'AdminInsurancesController',
		controllerAs: 'insurancesCtrl',
	};
});
adminDash.controller('AdminInsurancesController', ['$http', '$scope', function($http, $scope) {
	//console.log('THIS IS INSURANCES');
	var type = 'InsuranceCompany';

	this.createInsurance = function() {
		//console.log('THIS IS CREATE INSURANCES');
		var data1 = this.info;
		//data1.type_list = [];

		console.log('datos para crear aseguradora');
		console.log(data1);

		$http.post(endpoint + type + '/Create', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se creó", data);
					var error_msg = "No se puedo agregar la aseguradora, verifica la información de nuevo.";
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Listo, aseguradora creada", data);
					var success_msg = 'La aseguradora ha sido creada con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
					$('#name').val('');
					$('#email').val('');
				}
			});
		this.data = {};
	};

	this.showInsurances = function() {
		var This = this;
		$http.get(endpoint + type + '/GetAll')
			.success(function(data) {
				if (!data.status) {
					console.log("No se encontraron aseguradoras", data);
					var error_msg = 'Ha ocurrido un error al cargar la lista de aseguradoras.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Lista de aseguradoras");
					console.log(data);

					$scope.insurances = data.response;
					//console.log(JSON.stringify(dProfile.name));
				}
			});
	};

	this.deleteInsurance = function(id) {
		console.log(id);
		data1 = {};
		data1.id = id;
		console.log(data1);
		$http.post(endpoint + type + '/Delete', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se pudo eliminar la aseguradora", data);
					var error_msg = 'Ha ocurrido un error al intentar eliminar la aseguradora.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Aseguradora eliminada exitosamente.");
					console.log(data);
					var index = $scope.insurances.indexOf(data1.id);
					$scope.insurances.splice(index, 1);
					var success = 'La aseguradora ha sido eliminada con éxito.';
					swal({
						title: "",
						text: success,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}
			});
	};
}]);
//Controller for Insurance Management in Admin Dashboard
adminDash.controller('InsurancesManagementController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	$('#insu-tab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	var id = $routeParams.id;
	var type = "InsuranceCompany";

	$scope.insuranceInfo = this;

	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron aseguradoras", data.error);
				var error_msg = 'Ha ocurrido un error al intentar cargar la aseguradora.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
				console.log(data);
			} else {
				// if successful, bind success message to message
				console.log("Resultado de busqueda de aseguradoras:");
				$scope.insuranceInfo.info = data.response;
				console.log($scope.insuranceInfo.info);

				if ($scope.insuranceInfo.info.type_list.length == 0) {
					$scope.insuranceInfo.info.type_list.push({
						name: '',
						category: ''
					});
				};
			}
		});
}]);
//Controller for Basic Info - Admin Insurances
adminDash.directive('basicInsurance', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/insurance/basic.html',
		controller: 'BasicInsuranceController',
		controllerAs: 'basicInsuranceCtrl',
	};
});
adminDash.controller('BasicInsuranceController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var type = "InsuranceCompany";
	$scope.insuranceInfo.basicInfo = {};
	var basicInfo = $scope.insuranceInfo.basicInfo;

	this.updateInsurance = function(id) {

		basicInfo.name = $scope.insuranceInfo.info.name;
		basicInfo.email = $scope.insuranceInfo.info.email;
		console.log(basicInfo);
		console.log(id);

		$http.post(endpoint + type + '/Update/' + id, basicInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudo actualizar la información de la aseguradora, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data);
					var success_msg = 'La información de la aseguradora ha sido actualizada con éxito.';
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
//Controller for Logo - Admin Insurances
adminDash.directive('insuranceLogo', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/insurance/logo.html',
		controller: 'LogoInsuranceController',
		controllerAs: 'logoInsuranceCtrl',
	};
});
adminDash.directive('insuranceFile', ['$parse', function($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.insuranceFile);
			var modelSetter = model.assign;

			element.bind('change', function() {
				scope.$apply(function() {
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);
adminDash.service('insuranceUpload', ['$http', function($http) {
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
				var success_msg = 'El logo de la aseguradora ha sido actualizado con éxito.';
				swal({
					title: "",
					text: success_msg,
					type: "success",
					confirmButtonText: "Aceptar",
				});
			})
			.error(function() {
				var error_msg = 'No se pudo actualizar el logo de la aseguradora.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
			});
	}
}]);
adminDash.controller('LogoInsuranceController', ['$http', '$scope', '$routeParams', 'insuranceUpload', function($http, $scope, $routeParams, insuranceUpload) {
	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#insurance-logo').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	$("#image").change(function() {
		readURL(this);
	});

	var type = 'InsuranceCompany';
	$scope.uploadFile = function(insurancecompany_id) {
		var file = $scope.myFile;
		console.log('file is ' + JSON.stringify(file));
		var uploadUrl = endpoint + type + '/UpdatePic/' + insurancecompany_id;
		insuranceUpload.uploadFileToUrl(file, uploadUrl);
	};
}]);
//Controller for Type List - Admin Insurances
adminDash.directive('typeList', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/insurance/type_list.html',
		controller: 'TypeListController',
		controllerAs: 'typeListCtrl',
	};
});
adminDash.controller('TypeListController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var type = "InsuranceCompany";
	$scope.insuranceInfo.typeList = {};
	var typeList = $scope.insuranceInfo.typeList;

	this.addType = function() {
		$scope.insuranceInfo.info.type_list.push({
			name: '',
			category: ''
		});
	};

	this.createType = function(insuranceCompanyID) {

		typeList = {};
		typeList.name = $scope.insuranceInfo.info.type_list.name;
		typeList.category = $scope.insuranceInfo.info.type_list.category;
		console.log(typeList);
		console.log(insuranceCompanyID);

		$http.post(endpoint + type + '/AddInsuranceType/' + insuranceCompanyID, typeList)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se pudo agregar el seguro, verifica la información de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data);
					var success_msg = 'El seguro ha sido agregado con éxito.';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}
			});
	};

	this.deleteType = function(id, type_id) {
		console.log(id);
		data1 = {};
		data1.id = type_id;
		console.log(data1);
		$http.post(endpoint + type + '/RemoveInsuranceType/' + id, data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se pudo eliminar el seguro", data);
					var error_msg = 'Ha ocurrido un error al intentar eliminar el seguro.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Seguro eliminado exitosamente.");
					console.log(data);
					var index = $scope.insuranceInfo.info.type_list.indexOf(type_id);
					$scope.insuranceInfo.info.type_list.splice(index, 1);
					var success_msg = 'El seguro ha sido eliminado con éxito.';
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
//Controller for Practices - Seccions in Admin
adminDash.directive('practices', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/practices.html',
		controller: 'AdminPracticesController',
		controllerAs: 'practicesCtrl',
	};
});
adminDash.controller('AdminPracticesController', ['$http', '$scope', function($http, $scope) {
	//console.log('THIS IS PRACTICES');
	var type = 'Practice';

	this.createPractice = function() {
		//console.log('THIS IS CREATE PRACTICES');
		var data1 = this.info;
		//data1.type_list = [];

		console.log('datos para crear especialidad');
		console.log(data1);

		$http.post(endpoint + type + '/Create', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se creó", data);
					var error_msg = "No se puedo agregar la especialidad, verifica la información de nuevo.";
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Listo, especialidad creada", data);
					var success_msg = 'La especialidad ha sido creada con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
					$("form #name").val('');
					$("form #type").val('');
				}
			});
		this.data = {};
	};

	this.showPractices = function() {
		var This = this;
		$http.get(endpoint + type + '/GetAll')
			.success(function(data) {
				if (!data.status) {
					console.log("No se encontraron especialidades", data);
					var error_msg = 'Ha ocurrido un error al intentar cargar la lista de especialidades.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Lista de especialidades");
					console.log(data);

					$scope.practices = data.response;
					//console.log(JSON.stringify(dProfile.name));
				}
			});
	};

	this.deletePractice = function(id) {
		console.log(id);
		data1 = {};
		data1.id = id;
		$http.post(endpoint + type + '/Delete', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se pudo eliminar la especialidad", data);
					var error_msg = 'Ha ocurrido un error al intentar eliminar la especialidad.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Especialidad eliminada exitosamente.");
					console.log(data);
					var index = $scope.practices.indexOf(data1.id);
					$scope.practices.splice(index, 1);
					var success_msg = 'La especialidad ha sido eliminada con éxito.';
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
//Controller for Practice Management in Admin Dashboard
adminDash.controller('PracticesManagementController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	$('#prac-tab a').click(function(e) {
		e.preventDefault();
		$(this).tab('show');
	});

	var id = $routeParams.id;
	var type = "Practice";

	$scope.practiceInfo = this;

	$http.get(endpoint + type + '/GetByID/' + id)
		.success(function(data) {
			if (!data.status) {
				console.log("No se encontraron especialidades", data.error);
				console.log(data);
				var error_msg = 'Ha ocurrido un error al intentar cargar la especialidad.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
			} else {
				// if successful, bind success message to message
				console.log("Resultado de busqueda de especialidades:");
				$scope.practiceInfo.info = data.response;
				console.log($scope.practiceInfo.info);
			}
		});
}]);
//Controller for Basic Info - Admin Practices
adminDash.directive('basicPractice', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/practice/basic.html',
		controller: 'BasicPracticeController',
		controllerAs: 'basicPracticeCtrl',
	};
});
adminDash.controller('BasicPracticeController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var type = "Practice";
	$scope.practiceInfo.basicInfo = {};
	var basicInfo = $scope.practiceInfo.basicInfo;

	this.updatePractice = function(practice_id) {

		basicInfo.name = $scope.practiceInfo.info.name;
		basicInfo.type = $scope.practiceInfo.info.type;
		console.log(basicInfo);
		console.log(practice_id);

		$http.post(endpoint + type + '/Update/' + practice_id, basicInfo)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se puede actualizar la información de la especialidad, verifica de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, doctor actualizado", data);
					var success_msg = 'La información de la especialidad ha sido actualizada con éxito!';
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
//Controller for Appointment Reasons Info - Admin Practices
adminDash.directive('reasonsPractice', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/practice/reasons.html',
		controller: 'ReasonsPracticeController',
		controllerAs: 'reasonsPracticeCtrl',
	};
});
adminDash.controller('ReasonsPracticeController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	var type = "Practice";
	$scope.practiceInfo.reasons = {};
	var reasons = $scope.practiceInfo.reasons;

	this.createReason = function(practice_id) {

		reasons.reason = $scope.practiceInfo.info.reason_list.reason;
		console.log(reasons);
		console.log(practice_id);

		$http.post(endpoint + type + '/AddAppointmentReason/' + practice_id, reasons)
			.success(function(data) {
				if (!data.status) {
					console.log("Paila, no se actualizó", data);
					var error_msg = 'No se puede agregar el motivo de consulta, verifica de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, motivo de consulta actualizado", data);
					var success_msg = 'El motivo de consulta ha sido agregado con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}
			});
	};

	this.deleteReason = function(practice_id, reason_id) {
		console.log(practice_id);
		data1 = {};
		data1.reason_id = reason_id;
		console.log(data1);
		$http.post(endpoint + type + '/RemoveAppointmentReason/' + practice_id, data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se pudo eliminar el motivo", data);
					var error_msg = 'No se puedo agregar el motivo de consulta, verifica de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					// if successful, bind success message to message
					console.log("Motivo eliminado exitosamente.");
					console.log(data);
					var index = $scope.practiceInfo.info.reason_list.indexOf(reason_id);
					$scope.practiceInfo.info.reason_list.splice(index, 1);
					var success_msg = 'El motivo de consulta ha sido eliminado con éxito!';
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

//Controller for Customize Sections
adminDash.directive('customize', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/customize.html',
		controller: 'CustomizeController',
		controllerAs: 'customCtrl',
	};
});

adminDash.controller('CustomizeController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
	if (localStorage.getItem("user")) {
		$scope.userInfo = JSON.parse(localStorage.user);
	};

	$http.get(endpoint + 'Home')
		.success(function(data) {
			if (!data.status) {
				console.log("No se actualizó", data);
				var error_msg = 'No se pudieron cargar los datos.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
				//console.log(JSON.stringify(data1));
			} else {
				// if successful, bind success message to message
				//console.log("Listo, datos cargados", data);
				$scope.text = data.response.home_info;
			}
		});

	this.saveChanges = function() {
		var data1 = {};
		data1.home_info = $scope.text;
		console.log(data1);

		$http.post(endpoint + 'Home' + '/Update', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se actualizó", data);
					var error_msg = 'No se pudieron guardar los cambios, verifica de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, cambios actualizados", data);
					var success_msg = 'Los cambios han sido guardados con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}
			});
	};

	this.invite = function() {
		var data1 = this.data;
		data1.message = "Hola, quiero invitarte a DocLinea, una plataforma online para agendar citas médicas al instante!";
		data1.email = $scope.userInfo.email;
		//console.log(data1);

		$http.post(endpoint + 'User' + '/Invite', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se envió el correo", data);
					var error_msg = 'No se pudo enviar el correo, intenta de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, correo enviado", data);
					$("#shadow, #form-box").fadeOut(800);
					$("#curtain-invite").css('right', '-465px');
				}
			});
	};

}]);

//Controller for Customize Notifications
adminDash.directive('notifications', function() {
	return {
		restrict: 'E',
		templateUrl: 'www/partials/admin/notifications.html',
		controller: 'NotificationsController',
		controllerAs: 'notyCtrl',
	};
});

adminDash.controller('NotificationsController', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {

	$http.get(endpoint + 'Notifications')
		.success(function(data) {
			if (!data.status) {
				console.log("No se actualizó", data);
				var error_msg = 'No se pudieron cargar los datos.';
				swal({
					title: "",
					text: error_msg,
					type: "error",
					confirmButtonText: "Aceptar",
				});
				//console.log(JSON.stringify(data1));
			} else {
				// if successful, bind success message to message
				//console.log("Listo, datos cargados", data);
				$scope.info = data.response.notification_info;
			}
		});

	this.saveChanges = function() {
		var data1 = {};
		data1.notification_info = $scope.info;
		//console.log(data1);

		$http.post(endpoint + 'Notifications' + '/Update', data1)
			.success(function(data) {
				if (!data.status) {
					console.log("No se actualizó", data);
					var error_msg = 'No se pudieron guardar los cambios, verifica de nuevo.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
					//console.log(JSON.stringify(data1));
				} else {
					// if successful, bind success message to message
					console.log("Listo, cambios actualizados", data);
					var success_msg = 'Los cambios han sido guardados con éxito!';
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