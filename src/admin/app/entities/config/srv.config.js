(function() {
'use strict';

  angular
    .module('rys-app')
    .factory('configService', configService);

  configService.$inject = ['$http'];
  function configService($http) {
    var service = {
      getAll:getAll
    };

    return service;

    ////////////////
    function getAll() {
      return $http.get('http://localhost:3101/api/configs');
    }
  }
})();
