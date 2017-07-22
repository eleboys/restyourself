(function () {
  'use strict';

  angular
    .module('rys-app')
    .config(['$httpProvider', function ( $httpProvider) {
      //$trace.enable('TRANSITION');
      $httpProvider.interceptors.push('authInterceptor');
    }]);

})();
