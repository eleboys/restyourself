(function() {
  'use strict';

  angular
    .module('rys-app')
    .factory('authTokenService', authTokenService);

  authTokenService.$inject = ['$cookies'];
  function authTokenService($cookies) {
    var service = {
      getAuthorizationHeader:getAuthorizationHeader,
      removeToken: removeToken,
      getToken: getToken,
      setToken: setToken
    };
    var tokenCookieKey = "BasicAuthentication";

    return service;

    ////////////////
    function getAuthorizationHeader() {
      var token = getToken();
      if (token)
        return 'Basic ' + getToken();
      return null;
    }

    function setToken(username, password) {
      var token = btoa(username+":"+password);
      $cookies.put(tokenCookieKey, token);
    }

    function getToken() {
      return $cookies.get(tokenCookieKey);
    }

    function removeToken() {
      $cookies.remove(tokenCookieKey);
    }


  }
})();
