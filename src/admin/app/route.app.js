(function () {
	'use strict';

	angular
		.module('rys-app')
		.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider,$locationProvider) {

			$urlRouterProvider.otherwise("/list");
			// $locationProvider.html5Mode(true);

			$stateProvider
				.state('app', {
					url: '',
					templateUrl: 'app/view.root.html',
					controller: 'RootController',
					abstract: true
				})
				.state('app.list', {
					url: '/list',
					templateUrl: 'app/entities/config/view.list.html',
					controller: 'ConfigListController',
          controllerAs: 'vm'
				});

		}]);
})();
