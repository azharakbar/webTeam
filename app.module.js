var app = angular.module('myApp', ['ngTable','ui.router','beaconTable','addBeacon','currStatus','deviceLog','deviceDetails','loginForm','editUser']);
app.config(function($stateProvider, $urlRouterProvider) {

     // $urlRouterProvider.otherwise("/state1");
      $stateProvider
        .state('login',{
            url: "",
          views :{
          'nav':{
            templateUrl:"./login/loginPage.html"
        
          }
          }
        
        })
        .state('user',{
            url: "/user",
          views :{
          'nav':{
            templateUrl:"./navbar/navbar.html"
        
          },
          'rest':{
            templateUrl: "./editUser/editUserView.html",
            controller: 'editUserController'

          }
          }
        
        })
        .state('navi',{
            url: "/success",
          views :{
          'nav':{
            templateUrl:"./navbar/navbar.html"
        
          },
          'rest':{
            template: '<div class="ngview" ui-view></div>'

          }
          }
        
        })
        .state('all', {
          url: "/all",
           views :{
          'nav':{
            templateUrl:"./navbar/navbar.html"
        
          },
          'rest':{
            templateUrl:"./currstatus/currStatusView.html",
            controller: 'currStatusController'
          },
          'third': {
            templateUrl: "./currstatus/currStatusDetailsView.html",
            controller: 'currStatusController'
          }
          }
        
        })
        .state('log', {
          url: "/log/:deviceId?deviceName?osVersion?batteryStatus",
           views :{
          'nav':{
            templateUrl:"./navbar/navbar.html"
        
          },
          'rest':{
            templateUrl:"./devicelog/deviceLogView.html",
            controller: 'deviceLogController'
          },
          'third': {
            templateUrl: "./deviceDetails/deviceDetailsView.html",
            controller: 'deviceDetailsController'
          }
          }
        
        })
         /*.state('beacon', {
          url: "/beacon",
          views :{
        'nav':{ templateUrl:"./navview.html" },
        'rest':{
          templateUrl:"./addBeaconView.html",
          controller: 'addBeaconController'
        }
      }
      })*/
         .state('beacon', {
          url: "/beacon",
          views :{
          'nav':{ templateUrl:"./navbar/navbar.html" },
          'rest':{
          templateUrl:"./beacon/beaconTableView.html",
          controller: 'beaconTableController'
        },
           'third': {
            templateUrl: "./beacon/addBeaconView.html",
            controller: 'addBeaconController'
          }
        }
      }); 
        });


