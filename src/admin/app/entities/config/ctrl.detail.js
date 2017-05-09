(function() {
'use strict';

  angular
    .module('rys-app')
    .controller('ConfigDetailController', ConfigDetailController);

  ConfigDetailController.$inject = ['configService', '$state'];
  function ConfigDetailController(configService, $state) {
    var vm = this;
    vm.save = save;
    vm.saving = false;
    vm.config = {
      type:'javascript'
    }

    activate();

    ////////////////

    function activate() { }

    function save() {
      if (!$('#apiForm').form('is valid'))
        return;
      vm.saving = true;
      configService.create(vm.config).then(function (params) {
        $state.go('app.list');
      });
    }
  }
})();
