angular.module('booking', ['ui.bootstrap']);
var endpoint = "http://192.241.187.135:1414/api_1.0/";

function BookingController($scope, $http, $routeParams) {
	var appointmentId = $routeParams.eventId;

	console.log('entramos a BOOKING <3', appointmentId);
	localStorage.getItem("user");
    //console.log(localStorage);
    $scope.userData = JSON.parse(localStorage.user);

	this.bookAppointment = function() {
		//console.log('Entra a signUp');
		var data1 = this.data;
        
        //console.log('obj usuario ', $scope.userData);
        data1.user_id = $scope.userData.id;
        data1.user_name = $scope.userData.username;
        if (data1.patient_is_user == 'true') {
        	data1.patient_name = $scope.userData.username;
        };
        console.log('cositas que llegan en el form ', data1);
        /*$http.post(endpoint + type + '/Create', data1)
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
               // window.location = "/#/user/" + user._id;
               window.location = "/#/account_confirmation/" + type + "/" + email;
           }
   		});*/
   		//this.data = {};
   };

}