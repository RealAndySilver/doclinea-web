angular.module('booking', ['ui.bootstrap']);
var endpoint = "http://192.241.187.135:1414/api_1.0/";

//Controlador para que un Usuario tome citas
function BookingController($scope, $http, $routeParams, $location, $anchorScroll) {

    //Parametros que vienen por URL y son necesarios para tomar una cita
    var appointmentId = $routeParams.eventId;
    var doctorId = $routeParams.doctorId;
    $scope.eventStart = new Date(atob($routeParams.start));
    $scope.eventEnd = new Date(atob($routeParams.end));

    //Validación de sesión activa
    if (localStorage.getItem("user")) {
        $scope.userData = JSON.parse(localStorage.user);
    }

    //Servicio GET para cargar información de Doctor con su ID
    $http.get(endpoint + "Doctor" + '/GetByID/' + doctorId)
        .success(function(data) {
            if (!data.status) {
                var error_msg = 'Ha ocurrido un error al intentar cargar la información.';
                swal({
                    title: "",
                    text: error_msg,
                    type: "error",
                    confirmButtonText: "Aceptar",
                });
            } else {
                $scope.doctorInfo = data.response;
                $scope.insurances = [];
                for (var i in $scope.doctorInfo.insurance_list) {
                    $scope.insurances.push($scope.doctorInfo.insurance_list[i].insurance);
                }
            }
        });

    //función que carga las aseguradoras del Doctor con sus respectivos seguros
    $scope.getInsurances = function(index) {
        if (index) {
            var pos = $scope.insurances.indexOf(index);
        };
        return [$scope.doctorInfo.insurance_list[pos].insurance_type];
    };

    //Función para tomar una cita disponible en el calendario del Doctor
    this.bookAppointment = function() {
        if (!localStorage.getItem("user")) {
            var error_msg = 'Recuerda iniciar tu sesión primero.';
            swal({
                title: "",
                text: error_msg,
                type: "warning",
                confirmButtonText: "Aceptar",
            });
        }
        var data1 = this.data;

        data1.user_id = $scope.userData.id;
        data1.user_name = $scope.userData.username;
        if (data1.patient_is_user == 'true') {
            data1.patient_name = $scope.userData.username;
        };
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
            function() {
                //Aquí se cambia el estado de la cita a tomada
                data1.status = "taken";
                $scope.takeAppointment(data1);
            });
    };

    //Función para agendar una cita después de llenar el formulario con la información del paciente
    $scope.takeAppointment = function(appointmentData) {

        //Servicio POST para agendar una cita
        $http.post(endpoint + "Appointment" + '/Take/' + appointmentId, appointmentData)
            .success(function(data) {
                if (!data.status) {
                    swal({
                        title: "",
                        text: "Ha ocurrido un error, por favor inténtalo nuevamente.",
                        type: "error",
                        confirmButtonText: "Aceptar",
                    });
                } else {
                    swal({
                        title: "Cita agendada!",
                        text: "Usted ha tomado la cita con éxito.",
                        type: "success",
                        confirmButtonText: "Aceptar",
                    }, function() {
                        window.location = "/#/user/" + appointmentData.user_id;
                        setTimeout(function() {
                            $('#applist').trigger("click");
                        }, 400);
                    });

                }
            })
    }

}