angular.module('calendarDoctor', ['ui.calendar', 'ui.bootstrap']);
var endpoint = "http://192.241.187.135:1414/api_1.0/";

//Controlador para añadir un calendario en el Dashboard de Doctor junto con su funcionalidad
function CalendarCtrl($scope, $http, $routeParams, uiCalendarConfig) {

	$scope.doctorId = $routeParams.doctorId;
	var date = new Date();
	var mm = date.getMinutes();
	var h = date.getHours();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	//Cargar zona horaria
	$scope.eventSource = {
		className: 'gcal-event',
		currentTimezone: 'Colombia/Bogota'
	};

	//Inicializar ARRAY de eventos
	$scope.events = [];

	$scope.eventsF = function(start, end, timezone, callback) {
		var s = new Date(start).getTime() / 1000;
		var e = new Date(end).getTime() / 1000;
		var m = new Date(start).getMonth();
		var events = [{
			title: 'Feed Me ' + m,
			start: s + (50000),
			end: s + (100000),
			allDay: false,
			className: ['customFeed']
		}];
		callback(events);
	};

	//Eventos de Ejemplo para cargar por defecto en el Calendario, no se utiliza actualmente
	$scope.calEventsExt = {
		color: '#f00',
		textColor: 'yellow',
		events: [{
			type: 'party',
			title: 'Lunch',
			start: new Date(y, m, d, 12, 0),
			end: new Date(y, m, d, 14, 0),
			allDay: false
		}, {
			type: 'party',
			title: 'Lunch 2',
			start: new Date(y, m, d, 12, 0),
			end: new Date(y, m, d, 14, 0),
			allDay: false
		}, {
			type: 'party',
			title: 'Click for Google',
			start: new Date(y, m, 28),
			end: new Date(y, m, 29),
			url: 'http://google.com/'
		}]
	};

	//función que se activa al hacer click en un dia del calendario
	$scope.alertOnEventClick = function(event, allDay, jsEvent, view) {
		//variable que muestra un evento seleccionado en el calendario
		$scope.selectedEvent = event;
	};

	//función que se activa al arrastrar un evento del calendario a otra posición
	$scope.alertOnDrop = function(event, revertFunc, jsEvent, ui, view) {
		$scope.alertMessage = ('Evento cambiado a ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
		//llamar a la función que actualiza un evento del calendario
		$scope.updateEvent(event);
	};

	//función que se activa al cambiar el tamaño de un evento 
	$scope.alertOnResize = function(event, jsEvent, ui, view) {
		$scope.alertMessage = ('Fecha de finalización cambiada a ' + event.end.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
		//llamar a la función que actualiza un evento del calendario
		$scope.updateEvent(event);
	};

	$scope.addRemoveEventSource = function(sources, source) {
		var canAdd = 0;
		angular.forEach(sources, function(value, key) {
			if (sources[key] === source) {
				sources.splice(key, 1);
				canAdd = 1;
			}
		});
		if (canAdd === 0) {
			sources.push(source);
		}
	};

	//Añade un evento por defecto el dia actual y sin estado
	$scope.addEvent = function(num) {
		var date = new Date();
		var mm = date.getMinutes();
		var h = date.getHours();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		$scope.events.push({
			title: 'Nuevo evento',
			start: new Date(y, m, d, h, mm),
			end: new Date(y, m, d, h, mm + 5),
			className: ['openSesame'],
			allDay: false,
			color: num == 0 ? '' : 'green',
			textColor: num == 0 ? 'black' : 'white',
			forceEventDuration: true
		});

		$scope.selectedEvent = $scope.events[$scope.events.length - 1];
	};

	//función que añade un evento en el día seleccionado del calendario
	$scope.addEventClick = function(start) {

		var date = new Date(start);
		var mm = date.getMinutes();
		var h = date.getHours();
		var d = date.getDate() + 1;
		var m = date.getMonth();
		var y = date.getFullYear();

		$scope.events.push({
			title: 'Descripción',
			start: new Date(y, m, d, h, mm),
			end: new Date(y, m, d, h, mm + 5),
			className: ['openSesame'],
			allDay: false,
			color: '',
			textColor: '',
			forceEventDuration: true
		});

		$scope.selectedEvent = $scope.events[$scope.events.length - 1];
	};

	//Remover evento de lista de eventos
	$scope.remove = function(index) {
		$scope.events.splice(index, 1);
	};

	//Cambiar la vista a día, semana o mes
	$scope.changeView = function(view, calendar) {
		if (calendar !== undefined) {
			calendar.fullCalendar('changeView', view);
		}
	};

	//Desplegar calendario
	$scope.renderCalender = function(calendar) {
		if (calendar) {
			calendar.fullCalendar('render');
		}
	};

	//Configuración de Calendario
	$scope.uiConfig = {
		calendar: {
			height: 650,
			editable: true,
			header: {
				left: 'title',
				center: '',
				right: 'today prev,next'
			},
			lang: 'es',
			eventClick: $scope.alertOnEventClick,
			eventDrop: $scope.alertOnDrop,
			eventResize: $scope.alertOnResize,
			dayClick: function(date, allDay, jsEvent, view) {
				$scope.addEventClick(date);
			},
		}
	};

	//Servicio GET que carga la información del doctor actual
	$scope.getCurrentDoctor = function(doctorId) {
		$http.get(endpoint + 'Doctor' + '/GetByID/' + doctorId)
			.success(function(data) {
				if (!data.status) {
					console.log("No se encontraron doctores", data.error);
				} else {
					$scope.docInfo = data.response;
				}
			});
	};

	//función que crea un evento a partir de la fecha seleccionada
	$scope.setAppointment = function(status, event) {
		//objeto appointment donde se va a guardar la información del evento
		var appointment = {}
		appointment.doctor_id = $scope.docInfo._id;
		appointment.doctor_name = $scope.docInfo.name + ' ' + $scope.docInfo.lastname;
		appointment.status = event.status;
		appointment.date_start = event.start;
		appointment.date_end = event.end;
		appointment.doctor_notes = event.description;
		appointment.location = $scope.docInfo.location_list;
		appointment.doctor_image = $scope.docInfo.profile_pic.image_url;
		console.log('citaa ', appointment);

		//Servicio POST para crear un evento (cita) con estado
		$http.post(endpoint + 'Appointment' + '/Create/' + appointment.doctor_id, appointment)
			.success(function(data) {
				if (!data.status) {
					var error_msg = 'No se pudo agendar la cita, inténtalo nuevamente.';
					swal({
						title: "",
						text: error_msg,
						type: "error",
						confirmButtonText: "Aceptar",
					});
				} else {
					var success_msg = 'Tu cita ha sido agendada con éxito!';
					swal({
						title: "",
						text: success_msg,
						type: "success",
						confirmButtonText: "Aceptar",
					});
				}

				$scope.getAppointments(appointment.doctor_id);
			});

	};

	//Servicio GET que carga el listado de citas del Doctor con su ID
	$scope.getAppointments = function(doctorId) {
		$http.get(endpoint + 'Appointment' + '/GetAllForDoctor/' + doctorId).success(function(data) {
			var appointments = data.response;

			$scope.events.length = 0;

			if (appointments.length > 0) {
				var eventColor = '';
				var eventStatus = 'Disponible';

				//Dependiendo del estado de evento, se le asigna un color y un label
				for (var i in appointments) {
					if (appointments[i].status == 'available') {
						eventColor = '#4DC34D';
						eventStatus = appointments[i].doctor_notes;
						eventTextColor = 'white';
						className = ['openSesame'];
					} else if (appointments[i].status == 'taken') {
						eventColor = '#E9530E';
						eventStatus = appointments[i].patient_name;
						eventTextColor = 'white';
						className = ['openSesame'];
					} else if (appointments[i].status == 'cancelled') {
						eventColor = '';
						eventStatus = 'Cancelado';
						eventTextColor = '';
						className = ['invisible-event'];
					} else {
						eventColor = '#4F6769';
						eventStatus = appointments[i].doctor_notes;
						eventTextColor = 'white';
						className = ['openSesame'];
					}

					var appointment = {
						_id: appointments[i]._id,
						title: eventStatus,
						start: new Date(appointments[i].date_start),
						end: new Date(appointments[i].date_end),
						status: appointments[i].status,
						description: appointments[i].doctor_notes,
						insurance: appointments[i].insurance,
						reason: appointments[i].reason,
						phone: appointments[i].patient_phone,
						className: className,
						allDay: false,
						color: eventColor,
						textColor: eventTextColor,
						forceEventDuration: true
					};
					//los eventos son agregados al ARRAY de eventos
					$scope.events.push(appointment);
				}
			}
			console.log($scope.events);
		});
	};

	//Función que actualiza el estado y duración de un evento, así como su cambio de fecha
	$scope.updateEvent = function(event) {
		//objeto appointment para guardar la información del evento
		var appointment = {}
		appointment.doctor_id = $scope.docInfo._id;
		appointment.doctor_name = $scope.docInfo.name + ' ' + $scope.docInfo.lastname;
		appointment.status = event.status;
		appointment.date_start = event.start;
		appointment.date_end = event.end;
		appointment.doctor_notes = event.description;
		appointment.location = $scope.docInfo.location_list;

		//Servicio POST que actualiza un evento
		$http.post(endpoint + 'Appointment' + '/Update/' + event._id, appointment)
			.success(function(data) {
				swal({
					title: "",
					text: "El estado de la cita ha sido actualizado.",
					type: "success",
					confirmButtonText: "Aceptar",
				}, function() {
					location.reload();
				});

			});

	};

	//función para cancelar cita por parte de doctor
	$scope.cancelAppointment = function(appointmentId) {
		console.log('ID citaa ', appointmentId);
		data1 = {};
		data1.doctor_id = $scope.doctorId;
		console.log('ID doctooor ', data1);

		swal({
				title: "Cancelación de Cita",
				text: "¿Seguro que quieres eliminar esta cita?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#5CB85C",
				confirmButtonText: "Aceptar",
				cancelButtonText: "Cancelar",
				closeOnConfirm: true,
			},
			function() {
				//Servicio POST para cancelar cita 
				$http.post(endpoint + "Appointment" + '/Cancel/' + appointmentId + '/' + "doctor", data1)
					.success(function(data) {
						if (!data.status) {
							swal({
								title: "Error de Servidor",
								text: "Ha ocurrido un error al cargar la información del doctor.",
								type: "error",
								confirmButtonText: "Aceptar",
							});
						} else {
							swal({
								title: "",
								text: "La cita ha sido eliminada con éxito.",
								type: "success",
								confirmButtonText: "Aceptar",
							}, function() {
								location.reload();
							});
						}
					});
			});

	}

	//función que valida que mientras el doctor actual tenga sesión, se carguen sus datos y sus eventos
	$scope.$watch('doctorId', function(newValue) {
		if (newValue) {
			$scope.getAppointments(newValue);
			$scope.getCurrentDoctor(newValue);
		}
	});

	$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
	$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}