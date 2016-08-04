var app =  angular.module('deviceDetails', ['ngTable','ngRoute','ui.router']);
app.controller('deviceDetailsController',function($scope,$window, $http,NgTableParams,$stateParams) {
  $scope.name = $stateParams.deviceName;
  $scope.id = $stateParams.deviceId;
  $scope.battery = $stateParams.batteryStatus;
  $scope.os = $stateParams.osVersion;

  
  });