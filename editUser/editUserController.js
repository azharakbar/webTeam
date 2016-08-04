var app = angular.module('editUser', ['ngRoute', 'ui.router']);

app.controller('editUserController', function($scope, $http){
  $scope.output = 'Edit User';
  $scope.sendPost2 = function(){
  let data = {
    userName : $scope.userName,
    userEmail : $scope.userEmail,
    id : $scope.id,
    password : $scope.password,
    rolr : $scope.role
  };

  $http({
    url : 'http://54.251.44.26:4009/api/edituser',
    method: 'POST',

    headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Bearer '+token},
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


