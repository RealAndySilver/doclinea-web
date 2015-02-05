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
        swal({  
			title: "Confirmación de Cita", 
			text: "¿Seguro que quieres tomar esta cita?",   
			type: "warning",   
			showCancelButton: true,   
			confirmButtonColor: "#5CB85C",   
			confirmButtonText: "Aceptar",
			cancelButtonText: "Cancelar",   
			closeOnConfirm: true,
		},
		function(){
			data1.status = "taken";
			//console.log('CITA TOMADA CON DATOS: ', data1);
			$scope.takeAppointment(data1);
		});
   };

   $scope.takeAppointment = function(appointmentData) {
   		console.log('AQUI LE PEGAMOS AL SERVICIO ', appointmentData, appointmentId);
   		$http.post(endpoint + "Appointment" + '/Take/' + appointmentId, appointmentData)
        .success(function(data) {
           if (!data.status) {
                console.log("No se pudo tomar la cita", data);
                swal({  
					title: "", 
					text: "Ha ocurrido un error, por favor inténtalo nuevamente.",   
					type: "error",   
					confirmButtonText: "Aceptar",
				});
           } else {
                   // if successful, bind success message to message
               console.log("Listo, la cita fue tomada" + data);
               swal({  
					title: "Cita agendada!", 
					text: "Usted ha tomado la cita con éxito.",   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
               window.location = "/#/user/" + appointmentData.user_id;
           }
   		})
   }

}