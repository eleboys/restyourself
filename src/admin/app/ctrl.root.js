(function() {
'use strict';

  angular
    .module('rys-app')
    .controller('RootController', RootController);

  RootController.$inject = ['spinnerService','$transitions'];
  function RootController(spinnerService,$transitions) {
    var vm = this;
    activate();

    ////////////////

    function activate() {
      $transitions.onStart({ }, function(trans) {
        spinnerService.showSpinner();
        trans.promise.finally(function () {
          spinnerService.hideSpinner();
        });
      });
    }
  }
})();
