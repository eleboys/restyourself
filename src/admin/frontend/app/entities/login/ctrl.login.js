(function() {
  'use strict';

  angular
    .module('rys-app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['authService','$state'];
  function LoginController(authService, $state) {
    var vm = this;
    vm.user = {};
    vm.login = login;
    vm.loading = false;
    vm.hasError = false;

    activate();

    ////////////////

    function activate() { }

    function login() {
      if (vm.loading) return;
      vm.loading = true;
      vm.hasError = false;
      authService.login(vm.user.username, vm.user.password).then(function () {
        $state.go('app.list');
      }, function () {
        vm.hasError = true;
        vm.loading = false;
      });
    }
  }
})();
