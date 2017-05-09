(function() {
  'use strict';

  angular
    .module('rys-app')
    .directive('semanticDropdown', semanticDropdown);

  semanticDropdown.$inject = [];
  function semanticDropdown() {

    var directive = {
        link: link,
        restrict: 'A',
        scope: {
          options: '=semanticDropdown'
        }
    };
    return directive;

    function link(scope, element, attrs) {
      var options = scope.options || {};
      element.dropdown(options);
    }
  }

})();
