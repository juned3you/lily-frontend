(function() {
	'use strict';

	angular.module('app.page').controller('invoiceCtrl',
			[ '$scope', '$window', invoiceCtrl ]).controller(
			'authCtrl',
			[ '$scope', '$window', '$location', '$mdDialog', '$rootScope', 'pageService',
					authCtrl ]);

	function invoiceCtrl($scope, $window) {
		var printContents, originalContents, popupWin;

		$scope.printInvoice = function() {
			printContents = document.getElementById('invoice').innerHTML;
			originalContents = document.body.innerHTML;
			popupWin = window.open();
			popupWin.document.open();
			popupWin.document
					.write('<html><head><link rel="stylesheet" type="text/css" href="styles/main.css" /></head><body onload="window.print()">'
							+ printContents + '</html>');
			popupWin.document.close();
		}
	}

	function authCtrl($scope, $window, $location, $mdDialog, $rootScope, pageService) {

		var original;

		$scope.user = {
			email : '',
			password : ''
		};
		
		$scope.newUser = {
				firstname : '',
				lastname : '',
				email : '',
				password : '',
				repassword: ''
			}

		original = angular.copy($scope.user);

		$scope.login = function() {
			$location.url('/')
		}

		$scope.signup = function() {			
			if($scope.canSubmitRegistration() == false){
				$scope.showAlert('Empty', "Please fill all details");
				return;
			}
			
			if($scope.newUser.password != $scope.newUser.repassword ){
				$scope.showAlert('Password', "Password and Retype password doesn't match.");
				return;
			}
			
			pageService.createUser($scope.newUser).success(function(response) {
				$rootScope.user = {};
				$rootScope.user = response;
				$scope.showAlert('Info', "User registered successfully.");
				$location.url('/dashboard');
			}).error(function(data, status) {
				$scope.showAlert('Error', data);
			});
			
			//$location.url('/')
		}

		$scope.reset = function() {
			$location.url('/')
		}

		$scope.unlock = function() {
			$location.url('/')
		}

		$scope.canSubmit = function() {
			return $scope.loginForm.$valid
					&& !angular.equals($scope.user, original);
		};
		
		$scope.canSubmitRegistration = function() {
			return $scope.registerForm.$valid
					&& !angular.equals($scope.newUser, original);
		};

		$scope.showAlert = function(title, msg) {
			$mdDialog.show($mdDialog.alert().parent(
					angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true).title(title).content(
							msg).ariaLabel(msg).ok('Ok')
			// .targetEvent(ev)
			);
		};

		/**
		 * Login
		 */
		$scope.checkLogin = function() {
			pageService.login($scope.user).success(function(response) {
				$rootScope.user = {};
				$rootScope.user = response;
				$location.url('/dashboard')
			}).error(function(data, status) {
				$scope.showAlert('Bad request !!', data);
			});
		}
	}

})();
