(function() {
  'use strict';

  angular
    .module('rys-app')
    .factory('authService', authService);

  authService.$inject = ['authTokenService','$http', '$state', '$q'];
  function authService(authTokenService, $http, $state, $q) {
    var service = {
      login:login,
      logout: logout,
      getUser: getUser,
      getProfile: getProfile
    };
    var baseUrl = 'http://{{ip-address-placeholder}}:{{admin-port}}';
    var currentUser = null;
    return service;

    ////////////////

    function getUser() {
      return currentUser;
    }

    function login(username, password) {
      authTokenService.setToken(username, password);
      return getProfile();
    }

    function logout() {
      authTokenService.removeToken();
      currentUser = null;
      return $q.when(true);
    }

    function getProfile() {
      return $http.post(baseUrl+'/login').then(function (response) {
        currentUser = response.data;
        return currentUser;
      });
    }
  }
})();
