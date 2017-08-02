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
				require: '?ngModel',
        scope: {
          options: '=semanticDropdown'
        }
    };
    return directive;

    function link(scope, element, attrs, ngModelCtrl) {
			var options = scope.options || {};
			angular.extend(options, {
				onChange: function (value, text) {
					if (!ngModelCtrl) return;
					if (!value || !value.trim())
						ngModelCtrl.$setViewValue([]);
					else
						ngModelCtrl.$setViewValue(value.split(','));
				}
			})
      setTimeout(function () {
				element.dropdown(options);
				if (options.allowAdditions && ngModelCtrl.$modelValue){
					element.dropdown('set selected', ngModelCtrl.$modelValue)
				}
      });
    }
  }

})();
