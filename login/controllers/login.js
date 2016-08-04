var app = angular.module ( 'loginForm' , ['ngRoute'] ) ;
app.controller('test', function( $scope,$location , $rootScope , $http ){
	$scope.submit = function(){
		var data = {
			userId : $scope.username ,
			password : $scope.password ,
			deviceId : '0'
		}
		$http.post ( 'http://54.251.44.26:4009/api/login' , data )
			.then(function(res){
				console.log(res.data.result_code , "   " , res.data.role);

				if ( res.data.result_code === 200 && res.data.role === 'admin' ){
                                        token  =res.data.token;
					$rootScope.loggedIn = true ;
				       $location.path('/success') ;
					// window.location.href('dashboard.html')
					//window.location = 'dashboard.html'
				}else{
					$scope.username = '' ;
					$scope.password = '' ;
					$scope.error = "!! INVALID LOGIN CREDENTIALS !!" ;		
				}
			},function(err){
				console.log(err);
			})
	}		
});
