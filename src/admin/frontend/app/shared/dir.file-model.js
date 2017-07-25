(function() {
  'use strict';

  angular
    .module('rys-app')
    .directive('fileModel', fileModel);

  fileModel.$inject = [];
  function fileModel() {

    var directive = {
        link: link,
        require: 'ngModel',
        restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs, ngModelCtrl) {
      element.on('change', function (evt) {
        ngModelCtrl.$setViewValue(evt.target.files[0]);
      })
    }
  }

})();
