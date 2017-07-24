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
    vm.copy = copy;

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

    function copy(text) {
      var base = 'http://{{ip-address-placeholder}}:{{rest-port}}';
      clipboard.copy(base + text);
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
