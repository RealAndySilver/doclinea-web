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
		$scope.alertMessage = (event.title + ' en ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
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
		//aquí se fija la duración de evento por defecto a 30 minutos
		if (mm < 15) {
			mm = 0;
		} else if (mm < 45) {
			mm = 30;
		} else {
			mm = 0;
			++h;
		}
		$scope.events.push({
			title: 'Nuevo evento',
			start: new Date(y, m, d, h, mm),
			end: new Date(y, m, d, h, mm + 30),
			className: ['openSesame'],
			allDay: false,
			color: num == 0 ? '' : 'green',
			textColor: num == 0 ? 'black' : 'white',
			forceEventDuration: true
		});
	};

	//función que añade un evento en el día seleccionado del calendario
	$scope.addEventClick = function(start) {
		var date = new Date(start);
		var mm = date.getMinutes();
		var h = date.getHours();
		var d = date.getDate() + 1;
		var m = date.getMonth();
		var y = date.getFullYear();
		if (mm < 15) {
			mm = 0;
		} else if (mm < 45) {
			mm = 30;
		} else {
			mm = 0;
			++h;
		}

		$scope.events.push({
			title: 'Nuevo evento',
			start: new Date(y, m, d, h, mm),
			end: new Date(y, m, d, h, mm + 30),
			className: ['openSesame'],
			allDay: false,
			color: '',
			textColor: 'black',
			forceEventDuration: true
		});
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
			height: 450,
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
		appointment.location = $scope.docInfo.location_list;
		appointment.doctor_image = $scope.docInfo.profile_pic.image_url;

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

			if (appointments.length > 0) {
				var eventColor = '';
				var eventStatus = 'Disponible';

				//Dependiendo del estado de evento, se le asigna un color y un label
				for (var i in appointments) {
					if (appointments[i].status == 'available') {
						eventColor = '#4DC34D';
						eventStatus = 'Disponible';
						eventTextColor = 'white';
					} else if (appointments[i].status == 'taken') {
						eventColor = '#E9530E';
						eventStatus = 'Cita agendada';
						eventTextColor = 'white';
					} else if (appointments[i].status == 'cancelled') {
						eventColor = '#E71C2C';
						eventStatus = 'Cancelado';
						eventTextColor = 'white';
					} else {
						eventColor = '#4F6769';
						eventStatus = 'Externo';
						eventTextColor = 'white';
					}

					var appointment = {
						_id: appointments[i]._id,
						title: eventStatus,
						start: new Date(appointments[i].date_start),
						end: new Date(appointments[i].date_end),
						status: appointments[i].status,
						className: ['openSesame'],
						allDay: false,
						color: eventColor,
						textColor: eventTextColor,
						forceEventDuration: true
					};
					//los eventos son agregados al ARRAY de eventos
					$scope.events.push(appointment);
				}
			}
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
		appointment.location = $scope.docInfo.location_list;

		//Servicio POST que actualiza un evento
		$http.post(endpoint + 'Appointment' + '/Update/' + event._id, appointment)
			.success(function(data) {
				swal({
					title: "",
					text: "El estado de la cita ha sido actualizado.",
					type: "success",
					confirmButtonText: "Aceptar",
				});
			});
	};

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