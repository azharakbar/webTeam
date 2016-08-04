var app =  angular.module('currStatus', ['ngTable','ngRoute','ui.router']);
app.controller('currStatusController',function($scope, $http,NgTableParams) {
 // $http.get('http://54.251.44.26:4009/api/alldetails')
 $http({
  method: 'GET',
  url: 'http://54.251.44.26:4009/api/alldetails',
  headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDAiLCJkZXZpY2VJZCI6IjAiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE0NzAzMDI3NjgsImV4cCI6MTQ3MDM4OTE2OH0.usJurYLbaz1KvhRsxN1vk7d7QMYXx0Kjl6WtWXqJ9EY'
}
})
  .then(function (response)  {
  	$scope.currtable = new NgTableParams({page:2,count:8},{ dataset: response.data.result });
     var activeDevices = 0;
     var lowBattery = 0;
     var idleDevices = 0;
     var i;

  for(i=0;i<(response.data.result).length;i++)  {
    if(response.data.result[i].userName == "Unregistered")
      idleDevices++;
    else
      activeDevices++;
    if(response.data.result[i].batteryStatus < 15)
      lowBattery++;
  }
  $scope.activeDevices = activeDevices;
  $scope.idleDevices = idleDevices;
  $scope.lowBattery = lowBattery;

  $scope.order = function(x)  {

    $scope.orderField = x;
  }
  $scope.show = function(x)  {
  
    if(x == "unregistered")
      $scope.showField = { userName: "Unregistered"};
    else if(x == "all")
      $scope.showField = {};
    else if(x == "box")
      $scope.showField = { beaconName: "Box" };
  }
	});
 
  /*$http.post('http://54.251.44.26:4009/api/search', JSON.stringify(device)).then(function (response) {
  if (response.data)
  $scope.msg = response.data.result;
  }, function (response) {
  $scope.msg = "Service not Exists";
  $scope.statusval = response.status;
  $scope.statustext = response.statusText;
  $scope.headers = response.headers();
  });*/
	
});
