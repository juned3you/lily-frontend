(function() {
	'use strict';

	angular.module('app.page').controller('invoiceCtrl',
			[ '$scope', '$window', invoiceCtrl ]).controller('authCtrl',
			[ '$scope', '$window', '$location', authCtrl ]);

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

	function authCtrl($scope, $window, $location) {

		 var original;

	        $scope.user = {
	            email: '',
	            passowrd: ''
	        }   

	        original = angular.copy($scope.user);

		$scope.login = function() {
			$location.url('/')
		}

		$scope.signup = function() {
			$location.url('/')
		}

		$scope.reset = function() {
			$location.url('/')
		}

		$scope.unlock = function() {
			$location.url('/')
		}
		
		$scope.canSubmit = function() {
            return $scope.loginForm.$valid && !angular.equals($scope.user, original);
        };

		$scope.checkLogin = function() {

			if ("admin@lily.com" == $scope.user.email
					&& "admin" == $scope.user.password) {
				$location.url('/dashboard')
			} else {
				alert("Wrong credentials");
			}
		}
	}

})();
