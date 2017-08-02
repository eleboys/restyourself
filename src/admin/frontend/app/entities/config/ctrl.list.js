(function () {
	'use strict';

	angular
		.module('rys-app')
		.controller('ConfigListController', ConfigListController);

	ConfigListController.$inject = ['configService', 'NgTableParams', 'utilityService', '$scope'];
	function ConfigListController(configService, NgTableParams, utilityService, $scope) {
		var vm = this,
			colors = [ 'teal', 'violet', 'red', 'green', 'blue', 'orange', 'yellow', 'olive', 'purple', 'pink', 'brown', 'grey', 'black'],
			strColorMap = {},
			originalData = [];
		vm.configs = [];
		vm.tags = [];
		vm.searchKeyword = "";
		vm.deleteApi = deleteApi;
		vm.copy = copy;
		vm.tagFilter = [];
		vm.tableParams = new NgTableParams();
		vm.filterTag = filterTag;
		vm.strToColor = strToColor;

		activate();

		////////////////

		function activate() {
			reloadList();

			$scope.$watch(function () {
				return vm.tagFilter
			}, function (newValue, oldValue) {
				if (!(newValue)) return;
				vm.tableParams.settings({
					dataset: _.filter(originalData, function (o) {
						return _.difference(newValue, o.tags).length===0;
					})
				});
			})

		}

		function filterTag(tag) {
			if (_.includes(vm.tagFilter, tag)) return;
			vm.tagFilter.push(tag);
		}

		function strToColor(str) {
			if (strColorMap[str]) return strColorMap[str];
			if (colors.length) {
				strColorMap[str] = colors.shift();
			}
			return strColorMap[str];
		}

		function reloadList() {
			configService.getAll().then(function (result) {
				vm.tags.splice(0, vm.tags.length);
				vm.tags = _extractTags(result.data);
				originalData = result.data;
				vm.tableParams.settings({
					dataset: result.data
				});
			});
		}

		function _extractTags(data) {
			var tags = [];
			for (var i = 0; i < data.length; i++) {
				var element = data[i];
				tags = tags.concat(element.tags);
			}
			return _.uniq(tags);
		}

		function copy(text) {
			var base = 'http://{{ip-address-placeholder}}:{{rest-port}}';
			clipboard.copy(base + text);
		}

		function deleteApi(id) {
			if (confirm('Are you sure to delete?')) {
				configService.deleteById(id).then(function () {
					reloadList();
				});
			}
		}
	}
})();
