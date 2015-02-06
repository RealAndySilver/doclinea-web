angular.module('calendarPlugin', ['ui.calendar', 'ui.bootstrap']);
var endpoint = "http://192.241.187.135:1414/api_1.0/";

function CalendarCtrl($scope, $http, $routeParams, uiCalendarConfig) {

	$scope.doctorId = $routeParams.doctorId;
	var date = new Date();
	var mm = date.getMinutes();
	var h = date.getHours();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	// $scope.$watch('info', function(newValue, oldValue) {
	// 	console.log(newValue);
	// 	if(newValue) {
	// 		if(newValue._id) {
	// 			$scope.getCurrentDoctor(newValue);
	// 		}
	// 	}
	// });
	
	$scope.changeTo = 'Hungarian';
	/* event source that pulls from google.com */
	$scope.eventSource = {
			//url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
			className: 'gcal-event',           // an option!
			currentTimezone: 'Colombia/Bogota' // an option!
	};
	/* event source that contains custom events on the scope */
	$scope.events = [
	  /*
{title: 'All Day Eventw',start: new Date(y, m, 1)},
	  {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	  {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	  {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	  {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	  {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'},
	  {title: 'Birthday Party2',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false, test:"Okeedokee"},
*/
	];
	/* event source that calls a function on every view switch */
	$scope.eventsF = function (start, end, timezone, callback) {
	  var s = new Date(start).getTime() / 1000;
	  var e = new Date(end).getTime() / 1000;
	  var m = new Date(start).getMonth();
	  var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
	  callback(events);
	};

	$scope.calEventsExt = {
	   color: '#f00',
	   textColor: 'yellow',
	   events: [ 
		  {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
		  {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
		  {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
		]
	};
	/* alert on eventClick */
	$scope.alertOnEventClick = function( event, allDay, jsEvent, view ){
		$scope.alertMessage = (event.title + ' en ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss") + ' fue seleccionado');
	};
	/* alert on Drop */
	$scope.alertOnDrop = function( event, revertFunc, jsEvent, ui, view){
	   $scope.alertMessage = ('Evento cambiado a ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
	   console.log('Fecha cambiada ', event);
	   $scope.updateEvent(event);
	};
	/* alert on Resize */
	$scope.alertOnResize = function( event, jsEvent, ui, view){
	   $scope.alertMessage = ('Fecha de finalización cambiada a ' + event.end.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
	   console.log('Fecha de finalización cambiada a ', event);
	   $scope.updateEvent(event);
	};
	/* add and removes an event source of choice */
	$scope.addRemoveEventSource = function(sources,source) {
	  var canAdd = 0;
	  angular.forEach(sources,function(value, key){
		if(sources[key] === source){
		  sources.splice(key,1);
		  canAdd = 1;
		}
	  });
	  if(canAdd === 0){
		sources.push(source);
	  }
	};
	/* add custom event*/
	$scope.addEvent = function(num) {
	var date = new Date();
	var mm = date.getMinutes();
	var h = date.getHours();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
	if (mm < 15) {
		mm = 0;
	} else if (mm < 45){
		mm = 30;
	} else {
		mm = 0;
		++h;
	}
	  $scope.events.push({
		title: 'Nuevo evento',
		start: new Date(y, m, d, h, mm),
		end: new Date(y, m, d, h, mm+30),
		className: ['openSesame'],
		allDay: false,
		color: num == 0? '':'green',
		textColor: num == 0? 'black':'white',
		forceEventDuration: true
	  });
	};

	// var calendar = $('#calendar');
	// calendar.fullCalendar({
	//     dayClick: function(date, allDay, jsEvent, view) {
	//     	console.log('HOMEEEE');
	//         calendar.fullCalendar('renderEvent', { title: 'YOUR TITLE', start: date, allDay: true }, true );
	//     }
	// });

	/* remove event */
	$scope.remove = function(index) {
	  $scope.events.splice(index,1);
	};
	/* Change View */
	$scope.changeView = function(view,calendar) {
	  if(calendar !== undefined) {
			calendar.fullCalendar('changeView',view);
		}
	};
	/* Change View */
	$scope.renderCalender = function(calendar) {
	  if(calendar){
		calendar.fullCalendar('render');
	  }
	};
	//console.log('VARIABLE DE CALENDARIO ', $scope.uiConfig.calendar);
	/* config object */
	$scope.uiConfig = {
	  calendar:{
		height: 450,
		editable: true,
		header:{
		  left: 'title',
		  center: '',
		  right: 'today prev,next'
		},
		eventClick: $scope.alertOnEventClick,
		eventDrop: $scope.alertOnDrop,
		eventResize: $scope.alertOnResize,
		dayClick: function (start, allDay, jsEvent, view) {
		    alert('You clicked me!');
		    console.log(jsEvent);
		},
		// dayClick: function(date, allDay, jsEvent, view) {
	 //    	console.log('HOMEEEE');
	 //        calendar.fullCalendar('renderEvent', { title: 'YOUR TITLE', start: date, allDay: true }, true );
	 //    }
	  }
	};

	$scope.getCurrentDoctor = function(doctorId) {
		$http.get(endpoint + 'Doctor' + '/GetByID/' + doctorId)
        .success(function(data) {
            if (!data.status) {
               		console.log("No se encontraron doctores", data.error);
               		//console.log(data);
           		} else {
               		// if successful, bind success message to message
               		console.log("Resultado de busqueda de doctores:");
               		$scope.docInfo = data.response;
               		console.log($scope.docInfo);
           		}
  		});
	};

	$scope.setAppointment = function(status, event) {
		console.log('MI EVENTOO ', event);
		var appointment = {}
		appointment.doctor_id = $scope.docInfo._id;
		appointment.doctor_name = $scope.docInfo.name + ' ' + $scope.docInfo.lastname;
		appointment.status = event.status;
		appointment.date_start = event.start;
		appointment.date_end = event.end;
		appointment.location = $scope.docInfo.location_list;
		appointment.doctor_image = $scope.docInfo.profile_pic.image_url;
		console.log('aqui se guarda la cita', appointment);

		$http.post(endpoint + 'Appointment' + '/Create/' + appointment.doctor_id, appointment)
        .success(function(data) {
            if (!data.status) {
                console.log("Lo sentimos, no se creó", data);
                //console.log(JSON.stringify(data1));
                var error_msg = 'No se pudo agendar la cita, inténtalo nuevamente.';
           		swal({  
					title: "", 
					text: error_msg,   
					type: "error",   
					confirmButtonText: "Aceptar",
				});
            } else {
               // if successful, bind success message to message
               console.log("Listo, cita actualizada", data);
               var success_msg = 'Tu cita ha sido agendada con éxito!';
           		swal({  
					title: "", 
					text: success_msg,   
					type: "success",   
					confirmButtonText: "Aceptar",
				});
            }
            $scope.remove(); 
            $scope.getAppointments(appointment.doctor_id);
  		});

		// console.log('el doctor es', $scope.info);
		// console.log('la info de la cita es', $scope.events[0]);
	};

	$scope.getAppointments = function(doctorId) {
	  $http.get(endpoint + 'Appointment' + '/GetAllForDoctor/' + doctorId).success(function(data) {
	  	var appointments = data.response;
		//console.log('datos de servicio ', appointments);
		
		if(appointments.length > 0) {
		  var eventColor = '';
		  var eventStatus = 'Disponible';

		  for(var i in appointments) {
		  	if (appointments[i].status == 'available') { eventColor = '#5CB85C'; eventStatus = 'Disponible'; } 
		  	else if (appointments[i].status == 'taken') { eventColor = 'orange';  eventStatus = 'Cita agendada'; } 
		  	else if (appointments[i].status == 'cancelled') { eventColor = 'red';  eventStatus = 'Cancelado'; } 
		  	else { eventColor = 'gray'; eventStatus = 'Externo'; }

		  	var appointment = {
		  	  _id : appointments[i]._id,
			  title: eventStatus,
			  start: new Date(appointments[i].date_start),
			  end: new Date(appointments[i].date_end),
			  status: appointments[i].status,
			  className: ['openSesame'],
			  allDay: false,
			  color: eventColor,
			  textColor: 'black',
			  forceEventDuration: true
			};
			//console.log(appointment);
			$scope.events.push(appointment);
		  }
		}
	  });
	};

	$scope.updateEvent = function(event) {
	    console.log('entramoooos a UPDATE', event);
	    var appointment = {}
		appointment.doctor_id = $scope.docInfo._id;
		appointment.doctor_name = $scope.docInfo.name + ' ' + $scope.docInfo.lastname;
		appointment.status = event.status;
		appointment.date_start = event.start;
		appointment.date_end = event.end;
		appointment.location = $scope.docInfo.location_list;
		console.log('aqui se actualiza la cita', appointment);
	    $http.post(endpoint + 'Appointment' + '/Update/' + event._id, appointment)
	  	    .success(function(data) {
	  	    	console.log('service response ', data);
	  			//var appointments = data.response;
	    });
	};

	$scope.$watch('doctorId', function(newValue) {
	  console.log(newValue);
	  if(newValue) {
		$scope.getAppointments(newValue);
		$scope.getCurrentDoctor(newValue);
	  }
	});

	/* event sources array*/
	$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
	$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
}
