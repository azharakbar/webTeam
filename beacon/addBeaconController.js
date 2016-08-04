var app = angular.module('addBeacon', ['ngTable','ngRoute','ui.router']);
app.controller('addBeaconController', function($scope, $http){
  $scope.output = "Add Beacon";
  $scope.sendPost = function(){
    let data = {
        beaconName: $scope.beaconName,
        majorId: $scope.majorId,
        minorId: $scope.minorId,
        uuId: $scope.uuId
    };
    $http({
      url : 'http://54.251.44.26:4009/api/beacon',
      method: 'POST',

      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj){
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
        return str.join("&");
      },


      data: data
    })
      .then(function(response){
        console.log("THEN:", response);
        $scope.output = response.data.result_string;
      })
      .catch(function(response){
        console.log("THEN:", response);
        $scope.output = response;
      });
  };
});