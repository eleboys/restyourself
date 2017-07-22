(function() {
  'use strict';

  angular
    .module('rys-app')
    .directive('rysHeader', RysHeader);

  RysHeader.$inject = ['authService', '$state'];
  function RysHeader(authService, $state) {
    // Usage:
    //
    // Creates:
    //
    var directive = {
        templateUrl: 'app/layout/dir.header.html',
        link: link,
        restrict: 'E',
        scope: {
        }
    };
    return directive;

    function link(scope, element, attrs) {
      scope.logout = function () {
        authService.logout().then(function () {
          $state.go('login');
        });
      }

      scope.user = authService.getUser();
    }
  }

})();
