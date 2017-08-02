(function () {
	'use strict';

	angular
		.module('rys-app')
		.factory('utilityService', utilityService);

	utilityService.$inject = ['$http'];
	function utilityService($http) {
		var service = {
			uploadFileToUrl: uploadFileToUrl,
			downloadFileFromData: downloadFileFromData,
			stringToColor: stringToColor,
		};

		return service;

		////////////////

		function stringToColor(str) {
				var hash = 0;
				for (var i = 0; i < str.length; i++) {
					hash = str.charCodeAt(i) + ((hash << 5) - hash);
				}

				var c = (hash & 0x00FFFFFF)
					.toString(16)
					.toUpperCase();

				return "#"+"00000".substring(0, 6 - c.length) + c;
		}

		function downloadFileFromData(data, fileName) {
			var saveData = (function () {
				var a = document.createElement("a");
				document.body.appendChild(a);
				a.style = "display: none";
				return function (data, fileName) {
					var json = JSON.stringify(data, null, '\t'),
						blob = new Blob([json], { type: "application/json" }),
						url = window.URL.createObjectURL(blob);
					a.href = url;
					a.download = fileName;
					a.click();
					window.URL.revokeObjectURL(url);
				};
			}());
			saveData(data, fileName);
		}

		function uploadFileToUrl(url, file) {
			var fd = new FormData();
			fd.append('importfile', file);
			return $http.post(url, fd, {
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined }
			});
		}
	}
})();
