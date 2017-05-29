(function() {
'use strict';

  angular
    .module('rys-app')
    .controller('ConfigListController', ConfigListController);

  ConfigListController.$inject = ['configService'];
  function ConfigListController(configService) {
    var vm = this;
    vm.configs = [];
    vm.searchKeyword = "";
    vm.deleteApi = deleteApi;

    activate();

    ////////////////

    function activate() {
      reloadList();
    }

    function reloadList() {
      configService.getAll().then(function (result) {
        vm.configs = result.data;
      })
    }


    function deleteApi(id) {
      if(confirm('Are you sure to delete?')) {
        configService.deleteById(id).then(function () {
          reloadList();
        });
      }
    }
  }
})();
