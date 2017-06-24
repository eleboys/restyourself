(function() {
'use strict';

  angular
    .module('rys-app')
    .controller('ConfigDetailController', ConfigDetailController);

  ConfigDetailController.$inject = ['configService', '$state','api'];
  function ConfigDetailController(configService, $state, api) {
    var vm = this;
    vm.save = save;
    vm.saving = false;
    vm.removeHeader = removeHeader;
    vm.api = api;

    activate();

    ////////////////

    function activate() { }

    function save() {
      if (!$('#apiForm').form('is valid'))
        return;
      vm.saving = true;
      var method = vm.api.id ? 'update' : 'create';
      configService[method](vm.api).then(function (params) {
        $state.go('app.list');
      });
    }

    function removeHeader(header) {
      var index = vm.api.headers.indexOf(header);
      vm.api.headers.splice(index, 1);
    }

  }
})();
