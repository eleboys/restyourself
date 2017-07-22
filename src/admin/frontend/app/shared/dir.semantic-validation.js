(function() {
  'use strict';

  angular
    .module('rys-app')
    .directive('semanticValidation', semanticValidation);

  semanticValidation.$inject = [];
  function semanticValidation() {

    var directive = {
        link: link,
        restrict: 'A',
        scope: {
          rules : '=semanticValidation'
        }
    };
    return directive;

    function link(scope, element, attrs) {
      var rules = scope.rules || {};
      element.form(rules);
    }
  }
})();
