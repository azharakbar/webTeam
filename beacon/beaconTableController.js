var app = angular.module('beaconTable', ['ngTable','ngRoute','ui.router']);
app.controller('beaconTableController',function($scope, $http,NgTableParams) {
  $http.get('http://54.251.44.26:4009/api/beacon')
    .then(function (response)  {
    	console.log(response);
      $scope.beaconTable = new NgTableParams({},{ dataset: response.data.result });
    });
});