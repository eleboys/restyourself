(function() {
  'use strict';

  angular
    .module('rys-app')
    .factory('spinnerService', spinnerService);

  spinnerService.$inject = ['$rootScope'];
  function spinnerService($rootScope) {
    var service = {
      showSpinner: showSpinner,
      hideSpinner: hideSpinner
    };

    return service;

    ////////////////
    function showSpinner() {
      $rootScope.showSpinner = true;
    }

    function hideSpinner() {
      $rootScope.showSpinner = false;
    }
  }
})();
