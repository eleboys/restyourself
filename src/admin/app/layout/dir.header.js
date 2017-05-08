(function() {
  'use strict';

  angular
    .module('rys-app')
    .directive('rysHeader', RysHeader);

  RysHeader.$inject = [];
  function RysHeader() {
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
    }
  }

})();
