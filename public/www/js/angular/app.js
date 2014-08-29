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
            when('/sign_on', {
                templateUrl: 'www/sign_on.html'
            }).
            when('/doctor/gregory_house', {
                templateUrl: 'www/doctor.html'
            }).
            /*when('/doctor/gregory_house#doc-book', {
                templateUrl: 'www/doctor.html'
            }).*/
            /*when('/:PoleeCastillo/search_plan', {
                templateUrl: 'www/plan_form.html',
                controller: 'SliderController'
            }).*/
            otherwise({
                redirectTo: '/404'
            });
    }]);   

})();