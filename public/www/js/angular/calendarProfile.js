//var endpoint = "http://doclinea.com:1414/api_1.0/";

angular.module('calendarProfile', ['ui.calendar', 'ui.bootstrap']);

//Controlador para añadir un calendario en el perfil de Doctor junto con su funcionalidad
function CalendarProfileCtrl($scope, $http, $routeParams, EndpointService) {
	var endpoint = EndpointService.ip;
	$scope.doctorId = $routeParams.id;
	var date = new Date();
	var mm = date.getMinutes();
	var h = date.getHours();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	//Cargar zona horaria
	$scope.eventSource = {
		className: 'gcal-event', // an option!
		currentTimezone: 'Colombia/Bogota' // an option!
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
		if (!localStorage.getItem("user")) {
            var error_msg = 'Recuerda iniciar tu sesión primero.';
            swal({
                title: "",
                text: error_msg,
                type: "warning",
                confirmButtonText: "Aceptar",
            });
            return;
        }
		$scope.alertMessage = ('Cita ' + event.title + ' para ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
		//console.log('id de la cita seleccionada ', btoa(new Date(event.start)));
		var start = btoa(new Date(event.start));
		var end = btoa(new Date(event.end));
		swal({
				title: "Selección de Cita",
				text: "¿Seguro que quieres agendar esta cita?",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#5CB85C",
				confirmButtonText: "Aceptar",
				cancelButtonText: "Cancelar",
				closeOnConfirm: true,
			},
			function() {
				//redirección a formulario de agendar cita
				window.location = "/#/booking/" + event._id + '/' + $scope.doctorId + '/' + start + '/' + end;
			});
	};
	
	//funcion bloqueada para usuario
	$scope.alertOnDrop = function(event, revertFunc, jsEvent, ui, view) {
		$scope.alertMessage = ('Evento cambiado a ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
		console.log('Fecha cambiada ', event);
		$scope.updateEvent(event);
	};

	//funcion bloqueada para usuario
	$scope.alertOnResize = function(event, jsEvent, ui, view) {
		$scope.alertMessage = ('Fecha de finalización cambiada a ' + event.end.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
		console.log('Fecha de finalización cambiada a ', event);
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
	
	//no se utiliza en la vista de perfil de Doctor
	$scope.addEvent = function(num) {
		var date = new Date();
		var mm = date.getMinutes();
		var h = date.getHours();
		var d = date.getDate();
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
			color: num == 0 ? '' : 'green',
			textColor: num == 0 ? 'black' : 'white',
			forceEventDuration: true
		});
	};

	//no se utiliza en la vista de perfil de Doctor
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
			editable: false,
			header: {
				left: 'title',
				center: '',
				right: 'today prev,next'
			},
			lang: 'es',
			eventClick: $scope.alertOnEventClick,
			eventDrop: false,
			eventResize: false,
			disableDragging: true,
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

	//Servicio GET que carga el listado de citas disponibles para ser tomadas por el usuario
	$scope.getAppointments = function(doctorId) {
		$http.get(endpoint + 'Appointment' + '/GetAvailableForDoctor/' + doctorId).success(function(data) {
			var appointments = data.response;

			if (appointments.length > 0) {
				var eventColor = '';
				//var eventStatus = 'Disponible';

				//Dependiendo del estado de evento, se le asigna un color y un label
				for (var i in appointments) {
					if (appointments[i].status == 'available') {
						eventColor = '#4DC34D';
						eventStatus = appointments[i].doctor_notes;
						eventTextColor = 'white';
					} else if (appointments[i].status == 'taken') {
						eventColor = '#E9530E';
						eventStatus = 'Cita agendada';
						eventTextColor = 'black';
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
						description: appointments[i].doctor_notes,
						className: ['openSesame'],
						allDay: false,
						color: eventColor,
						textColor: 'black',
						forceEventDuration: true
					};
					//los eventos son agregados al ARRAY de eventos
					$scope.events.push(appointment);
				}
			}
		});
	};

	$scope.$watch('doctorId', function(newValue) {
		console.log(newValue);
		if (newValue) {
			$scope.getAppointments(newValue);
			$scope.getCurrentDoctor(newValue);
		}
	});

	$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
	$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}