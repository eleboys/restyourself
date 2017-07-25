(function() {
  'use strict';

  angular
    .module('rys-app')
    .factory('utilityService', utilityService);

  utilityService.$inject = ['$http'];
  function utilityService($http) {
    var service = {
      uploadFileToUrl:uploadFileToUrl,
      downloadFileFromData: downloadFileFromData
    };

    return service;

    ////////////////

    function downloadFileFromData(data, fileName) {
      var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            var json = JSON.stringify(data, null, '\t'),
                blob = new Blob([json], {type: "application/json"}),
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
            headers: {'Content-Type': undefined}
        });
    }
  }
})();
