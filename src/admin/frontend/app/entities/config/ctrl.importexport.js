(function() {
  'use strict';

  angular
    .module('rys-app')
    .controller('ImportExportController', ImportExportController);

  ImportExportController.$inject = ['$http', 'utilityService'];
  function ImportExportController($http, utilityService) {
    var vm = this,
        baseUrl = 'http://{{ip-address-placeholder}}:{{admin-port}}/';
    vm.export = exportConfigs;
    vm.import = importConfigs;
    vm.file = null;

    activate();

    ////////////////

    function exportConfigs() {
      return $http.get(baseUrl + 'export').then(function (result) {
        utilityService.downloadFileFromData(result.data, 'export.json');
      });
    }

    function importConfigs() {
			if (confirm('Selected file will override your current rest configs. Are you sure?')) {
				utilityService.uploadFileToUrl(baseUrl + 'import', vm.file);
			}
    }

    function activate() {

    }


  }
})();
