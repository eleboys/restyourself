(function() {
'use strict';

  angular
    .module('rys-app')
    .controller('ConfigListController', ConfigListController);

  ConfigListController.$inject = ['configService'];
  function ConfigListController(configService) {
    var vm = this;
    vm.configs = [];
    activate();

    ////////////////

    function activate() {
      configService.getAll().then(function (result) {
        vm.configs = result.data;
      })
    }
  }
})();
