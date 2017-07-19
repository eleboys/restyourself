(function() {
  'use strict';

  angular
    .module('rys-app')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$injector','$q','$state'];
  function authInterceptor($injector, $q, $state) {
    var service = {
      request: request,
      responseError: responseError
    };

    return service;

    ////////////////
    function request(config) {
      config.headers = config.headers || {};

      var AuthTokenService = $injector.get('authTokenService');
      // // Inject `Authorization` header.
      if (!config.headers.hasOwnProperty('Authorization') && AuthTokenService.getAuthorizationHeader()) {
        config.headers.Authorization = AuthTokenService.getAuthorizationHeader();
      }

      return config;
    }

    function responseError(rejection) {
      if (!rejection) {
        return $q.reject(rejection);
      }

      if (401 === rejection.status) {
        var AuthTokenService = $injector.get('authTokenService');
        AuthTokenService.removeToken();
        $state.go('login');
      }

      return $q.reject(rejection);
    }
  }
})();
