//Parent Controller for Doctors Searching
var endpoint = "http://192.241.187.135:1414/api_1.0/";

var searchView = angular.module('searching', [])
searchView.controller('GetDoctorsController', ['$http', '$routeParams', function($http, $routeParams) {

	var encodedParam = btoa("undefined");

	var docData = this;

	var city = $routeParams.city;
	var localidad = $routeParams.localidad;
	var practice_list = $routeParams.practice_list;
	var insurance_list = $routeParams.insurance_list;

	docData.data1 = {};
	docData.data1.localidad = {};

	if (city !== encodedParam) {
		docData.data1.city = city;
	}

	if (practice_list !== encodedParam) {
		docData.data1.practice_list = practice_list;
	}

	if (insurance_list !== encodedParam) {
		var split = insurance_list.split('+');
		docData.data1.insurance_list = [{
			insurance: split[0],
			insurance_type: split[1]
		}];
	}

	if (localidad !== encodedParam) {
		docData.data1.localidad.name = localidad;
	}

}]);


//SEARCH DOCTOR FROM LANDING PAGE
searchView.controller('SearchListsController', ['$http', '$scope', 'PracticesService', 'InsurancesService', function($http, $scope, PracticesService, InsurancesService) {
	$scope.encodedParam = btoa("undefined");

	this.practices = [];
	this.insurances = [];
	this.localidades = localidades;

	var self = this;

	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		self.practices = response.data.response;
	});

	var promiseGetAllInsurances = InsurancesService.getAll();
	promiseGetAllInsurances.then(function(response) {
		self.insurances = response.data.response;
	});
}]);

searchView.controller('LandpageDocSearchController', ['$http', '$scope', '$routeParams', 'PracticesService', 'InsurancesService', function($http, $scope, $routeParams, PracticesService, InsurancesService) {

	var encodedParam = btoa("undefined");

	this.docs = [];
	this.practices = [];
	$scope.insurances = [];
	this.localidades = localidades;

	var self = this;

	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		self.practices = response.data.response;
	});

	var promiseGetAllInsurances = InsurancesService.getAll();
	promiseGetAllInsurances.then(function(response) {
		$scope.insurances = response.data.response;
	});

	$scope.getInsurances = function(index) {
		if (index) {
			return index.insurance.type_list;
		}
		return;
	};

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

	var city = $routeParams.city;
	var practice_list = $routeParams.practice_list;
	var insurance_list = $routeParams.insurance_list;
	var localidad = $routeParams.localidad;

	var data1 = {};
	data1.localidad = {};

	if (city !== encodedParam) {
		data1.city = city;
	}

	if (practice_list !== encodedParam) {
		data1.practice_list = practice_list;
	}

	if (insurance_list !== encodedParam || insurance_list == undefined) {
		data1.insurance_list = insurance_list;
	}

	if (localidad !== encodedParam) {
		data1.localidad.name = localidad;
	}

	var getPosition = function(list, option) {
		for (var i in list) {
			if (list[i].name === option) {
				return list[i];
			}
		}
	};

	this.selectedPractice = getPosition(this.practices, this.practice_list);
	this.selectedCity = getPosition(this.cities, this.city);
	this.selectedInsurance = getPosition(this.insurances, this.insurance_list);
	this.selectedLocalidad = getPosition(this.localidades, this.localidad);

	this.searchDoctor = function() {
		var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
		var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
		var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance;
		var selectedLocalidad = !this.selectedLocalidad ? encodedParam : this.selectedLocalidad.name;

		var selectedInsuranceUrl = selectedInsurance.insurance ? selectedInsurance.insurance.name + '+' + selectedInsurance.insurance_type.name : encodedParam;

		window.location = "/#/search/" + selectedCity + "/" + selectedLocalidad + "/" + selectedPractice + "/" + selectedInsuranceUrl;
	};

}]);


//GET DOCTOR BY SEARCH PARAMS --> to search page
searchView.controller('DoctorSearchController', ['$http', '$scope', 'PracticesService', 'InsurancesService', function($http, $scope, PracticesService, InsurancesService) {

	var encodedParam = btoa("undefined");

	var docData = this;
	this.practices = [];
	$scope.insurances = [];
	this.localidades = localidades;

	var self = this;

	docData.city = $scope.getDrCtrl.data1.city;
	docData.practice = $scope.getDrCtrl.data1.practice_list;
	docData.insurance = $scope.getDrCtrl.data1.insurance_list;
	docData.localidad = $scope.getDrCtrl.data1.localidad;

	var getPosition = function(list, option) {
		for (var i in list) {
			if (list[i].name === option) {
				return list[i];
			}
		}
	};

	var promiseGetAllPractices = PracticesService.getAll();
	promiseGetAllPractices.then(function(response) {
		self.practices = response.data.response;
	});

	var promiseGetAllInsurances = InsurancesService.getAll();
	promiseGetAllInsurances.then(function(response) {
		$scope.insurances = response.data.response;
	});

	$scope.getInsurances = function(index) {
		if (index) {
			return index.insurance.type_list;
		}
		return;
	};

	this.selectedPractice = getPosition(this.practices, docData.practice);

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
	this.selectedCity = getPosition(this.cities, docData.city);
	this.selectedInsurance = getPosition(this.insurances, docData.insurance_list);
	this.selectedLocalidad = getPosition(this.localidades, docData.localidad.name);

	this.searchDoctor = function() {

		var selectedCity = !this.selectedCity ? encodedParam : this.selectedCity.name;
		var selectedPractice = !this.selectedPractice ? encodedParam : this.selectedPractice.name;
		var selectedInsurance = !this.selectedInsurance ? encodedParam : this.selectedInsurance;
		var selectedLocalidad = !this.selectedLocalidad ? encodedParam : this.selectedLocalidad.name;

		var selectedInsuranceUrl = selectedInsurance.insurance ? selectedInsurance.insurance.name + '+' + selectedInsurance.insurance_type.name : encodedParam;

		window.location = "/#/search/" + selectedCity + "/" + selectedLocalidad + "/" + selectedPractice + "/" + selectedInsuranceUrl;
	};
}]);