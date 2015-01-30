(function(){

	var app = angular.module('calendarPlugin', ['ui.calendar', 'ui.bootstrap']);

	var endpoint = "http://192.241.187.135:1414/api_1.0/";

	app.controller('CalendarCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
		$scope.info = {};

		$scope.$watch('info', function(newValue, oldValue) {
			console.log(newValue);
			if(newValue) {
				if(newValue._id) {
					$scope.getAppointments(newValue);
					//$('#main-calendar').trigger("click");
				}
			}
		});

		// $('#my-tabs a#main-calendar').on('shown.bs.tab', function (e) {
		//     e.preventDefault();
		//     $(this).tab('show');
		//     calendar.fullCalendar('render');
		//     console.log('dentro del calendario');
		// });

		$scope.eventByDoctor = function(doctor) {
			$scope.info = doctor;
			//$scope.getAppointments();
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

		// $scope.events = [
		//   {title: 'All Day Eventw',start: new Date("Tue Jan 27 2015 16:00:00 GMT-0500 (COT)")},
	 //      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
	 //      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
	 //      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
	 //      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
	 //      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'},
	 //      {title: 'Birthday Party2',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false, test:"Okeedokee"},
	 //    ];

	 	// $scope.events.push({title: 'All Day Eventw',start: new Date(y, m, 1)});
	 	//console.log($scope.events);

		/* event source that calls a function on every view switch */
		$scope.eventsF = function (start, end, timezone, callback) {
		  var s = new Date(start).getTime() / 1000;
		  var e = new Date(end).getTime() / 1000;
		  var m = new Date(start).getMonth();
		  var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
		  callback(events);
		  //console.log('Cambio de Vista');
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
		   $scope.alertMessage = ('Evento cambiado a ' + event.start.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
		};
		/* alert on Resize */
		$scope.alertOnResize = function( event, jsEvent, ui, view){
		   $scope.alertMessage = ('Fecha de finalización cambiada a ' + event.end.format("dddd DD [de] MMMM [de] YYYY h:MM:ss"));
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
			if ($scope.events.length > 0) {
				return;
			};
			//console.log($scope.info);
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
		    console.log('lo que voy a guardar ', $scope.events);
		};

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
		$scope.renderCalendar = function(calendar) {
		    if(calendar){
			  calendar.fullCalendar($scope.events);
		    }
		};

		/* config object */
		$scope.uiConfig = {
		  calendar:{
			height: 600,
			editable: true,
			lang: 'es',
			header:{
			  left: 'title',
			  center: '',
			  right: 'today prev,next'
			},
			//eventSources: [$scope.events, $scope.eventSource, $scope.eventsF],
			eventClick: $scope.alertOnEventClick,
			eventDrop: $scope.alertOnDrop,
			eventResize: $scope.alertOnResize
		  }
		};

		$scope.setAppointment = function(status) {
			var appointment = {}
			appointment.doctor_id = $scope.info._id;
			appointment.doctor_name = $scope.info.name + ' ' + $scope.info.lastname;
			appointment.status = status;
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
                $scope.remove(); 
      		});

			// console.log('el doctor es', $scope.info);
			//console.log('la info de la cita es', $scope.events[0]);
		};

		$scope.getAppointments = function(info) {
			console.log(info);
			console.log('citas del doctor:', info._id);
			$http.get(endpoint + 'Appointment' + '/GetAllForDoctor/' + info._id)
	            .success(function(data) {
	                if (!data.status) {
	                    console.log("Lo sentimos, no se cargaron las citas", data);
	                    //console.log(JSON.stringify(data1));
	                } else {
	                   // if successful, bind success message to message
	                   //console.log("Citas cargadas", data.response);

	                   $scope.appointments_list = data.response;
	                   console.log($scope.appointments_list);
	                   console.log('status', $scope.appointments_list[2].status);
	                   console.log('inicio', new Date($scope.appointments_list[2].date_start));
	                   console.log('final', new Date($scope.appointments_list[2].date_end));

	                   $scope.events = [
						  {title: 'All Day Eventw',start: new Date("Tue Jan 27 2015 16:00:00 GMT-0500 (COT)")},
					      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
					      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
					      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
					      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
					      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'},
					      {title: 'Birthday Party2',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false, test:"Okeedokee"},
					    ];
	                   console.log($scope.events);
	                   /*
	                    //for(var i in $scope.appointments_list) {
	                   		$scope.events.push({
								title: $scope.appointments_list[0].status,
								start: new Date($scope.appointments_list[0].date_start),
								end: new Date($scope.appointments_list[0].date_end),
								className: ['openSesame'],
								allDay: false,
								color: 'green',
								textColor: 'white',
								forceEventDuration: true
					    	});
	                   		console.log('la info de la cita es', $scope.events[0]);
	                    //}
	                    */

	       //              $scope.events.push({
								// // title: $scope.appointments_list[i].status,
								// title: 'Hola Polee',
								// // start: new Date($scope.appointments_list[i].date_start),
								// // end: new Date($scope.appointments_list[i].date_end),
								// start: new Date("2015-01-27T21:00:00.000Z"),
								// end: new Date("2015-01-27T21:30:00.000Z"),
								// className: ['openSesame'],
								// allDay: false,
								// color: 'green',
								// textColor: 'white',
								// forceEventDuration: true
					   //  	});

					    //console.log($scope.events);
					};
	                   
	      		});
		};

		/* event sources array*/
		$scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
		//$scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];

	}]);
	/* EOF */

})();

