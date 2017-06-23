(function() {
'use strict';

  angular
    .module('rys-app')
    .factory('configService', configService);

  configService.$inject = ['$http'];
  function configService($http) {
    var service = {
      getAll:getAll,
      getById: getById,
      create: create,
      update: update,
      deleteById : deleteById
    };
    var baseUrl = 'http://localhost:3101';
    return service;

    ////////////////

    function getById(id) {
      return $http.get(baseUrl + '/api/configs/'+id).then(function (api) {
        api = api.data;
        return {
          id : api.id,
          path: api.request.path,
          method: api.request.method,
          type: api.response.type,
          body: api.response.body,
          contentType: api.response.contentType,
          status: api.response.status,
          headers: api.response.headers || []
        }
      });
    }

    function getAll() {
      return $http.get(baseUrl + '/api/configs');
    }

    function create(configVM) {
      return $http.post(baseUrl + '/api/configs', configVM);
    }

    function update(configVM) {
      return $http.put(baseUrl + '/api/configs', configVM);
    }

    function deleteById(id) {
      return $http.delete(baseUrl + '/api/configs/'+id);
    }
  }
})();
