(function(){

	var app = angular.module('calendarPlugin', ['ui.calendar', 'ui.bootstrap']);

	var endpoint = "http://192.241.187.135:1414/api_1.0/";

	app.controller('CalendarCtrl', ['$scope', '$http', function($scope, $http) {

		$scope.info = {};
		$scope.eventByDoctor = function(doctor) {
			$scope.info = doctor;
			//console.log($scope.info);
		};

		var date = new Date();
		var mm = date.getMinutes();
		var h = date.getHours();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		
		/* event source that pulls from google.com */
		$scope.eventSource = {
				//url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic",
				className: 'gcal-event',           // an option!
				currentTimezone: 'Colombia/Bogota' // an option!
		};
		/* event source that contains custom events on the scope */
		$scope.events = [];

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
			$scope.alertMessage = (event.title + ' fue seleccionado ');
		};
		/* alert on Drop */
		 $scope.alertOnDrop = function( event, revertFunc, jsEvent, ui, view){
		   $scope.alertMessage = ('Evento cambiado a ' + event.start.format());
		};
		/* alert on Resize */
		$scope.alertOnResize = function( event, jsEvent, ui, view){
		   $scope.alertMessage = ('Fecha de finalización cambiada a ' + event.end.format());
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
			console.log($scope.info);
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
				title: 'Nota',
				start: new Date(y, m, d, h, mm),
				end: new Date(y, m, d, h, mm+30),
				className: ['openSesame'],
				allDay: false,
				color: num == 0? '':'green',
				textColor: num == 0? 'black':'black',
				forceEventDuration: true
		    });
		};
		/* remove event */
		$scope.remove = function(index) {
		  $scope.events.splice(index,1);
		};
		/* Change View */
		$scope.changeView = function(view,calendar) {
		  calendar.fullCalendar('changeView',view);
		};
		/* Change View */
		$scope.renderCalender = function(calendar) {
		  if(calendar){
			calendar.fullCalendar('render');
		  }
		};
		/* config object */
		$scope.uiConfig = {
		  calendar:{
			height: 450,
			editable: true,
			lang: 'es',
			header:{
			  left: 'title',
			  center: '',
			  right: 'today prev,next'
			},
			eventClick: $scope.alertOnEventClick,
			eventDrop: $scope.alertOnDrop,
			eventResize: $scope.alertOnResize
		  }
		};

		
		/* event sources array*/
		$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
		$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

		$scope.setAppointment = function() {
			var appointment = {}
			appointment.doctor_id = $scope.info._id;
			appointment.name = $scope.info.name + ' ' + $scope.info.lastname;
			appointment.status = 'available';
			appointment.date_start = $scope.events[0].start;
			appointment.date_end = $scope.events[0].end;
			appointment.location = $scope.info.location_list;
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
      		});

			// console.log('el doctor es', $scope.info);
			//console.log('la info de la cita es', $scope.events[0]);
		};

		$scope.getAppointments = function() {
			console.log('aquiles traigo las citas');
		};

	}]);
	/* EOF */

})();

