(function(){

    var app = angular.module('doclinea', [
      'ngRoute',
    ]);

    app.config(['$routeProvider',
        function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'www/landpage.html'
            }).
            when('/search', {
                templateUrl: 'www/search.html'
            }).
            when('/sign_up', {
                templateUrl: 'www/sign_up.html'
            }).
            when('/sign_in', {
                templateUrl: 'www/sign_in.html'
            }).
            when('/doctor/:doc_name', {
                templateUrl: 'www/doctor.html'
            }).
            /*when('/doctor/gregory_house#doc-book', {
                templateUrl: 'www/doctor.html'
            }).*/
            otherwise({
                redirectTo: '/404'
            });
    }]);   

})();