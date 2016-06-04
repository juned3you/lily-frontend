(function() {
	'use strict';

	angular.module('app.page').controller('invoiceCtrl',
			[ '$scope', '$window', invoiceCtrl ]).controller(
			'FrameModalInstanceCtrl',
			[ '$scope', '$sce', '$uibModalInstance', 'items',
					FrameModalInstanceCtrl ]).controller(
			'authCtrl',
			[ '$scope', '$window', '$location', '$mdDialog', '$rootScope',
					'$uibModal', 'pageService', authCtrl ]);

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

	function FrameModalInstanceCtrl($scope, $sce, $uibModalInstance, items) {
		$scope.detailFrame = $sce.trustAsResourceUrl(items[0]);

		$scope.ok = function() {
			$uibModalInstance.close("");
		};

		$scope.cancel = function() {
			$uibModalInstance.dismiss("cancel");
		};

	}

	function authCtrl($scope, $window, $location, $mdDialog, $rootScope,
			$uibModal, pageService) {

		var original;
		//var tabWindowId = null;

		$scope.user = {
			email : '',
			password : ''
		};

		$scope.newUser = {
			firstname : '',
			lastname : '',
			email : '',
			password : '',
			repassword : '',
			userType : '',
			userId : ''
		}

		original = angular.copy($scope.user);

		$scope.login = function() {
			$location.url('/')
		}

		$scope.signup = function() {
			if ($scope.canSubmitRegistration() == false) {
				$scope.showAlert('Empty', "Please fill all details");
				return;
			}

			if ($scope.newUser.password != $scope.newUser.repassword) {
				$scope.showAlert('Password',
						"Password and Retype password doesn't match.");
				return;
			}
			
			if ($scope.newUser.userId == undefined || $scope.newUser.userId == null 
					|| $scope.newUser.userId == ''){
				$scope.showAlert('Link to wearable',
				"Please link to your wearable");
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

			// $location.url('/')
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
					.clickOutsideToClose(true).title(title).content(msg)
					.ariaLabel(msg).ok('Ok')
			// .targetEvent(ev)
			);
		};

		/**
		 * Login
		 */
		$scope.checkLogin = function() {
			pageService.login($scope.user).success(function(response) {				
				$rootScope.user = response;
				$location.url('/dashboard')
			}).error(function(data, status) {
				$scope.showAlert('Bad request !!', data);
			});
		}

		/**
		 * read values values from cookies.
		 */
		$window.callback = function(data) {
			$scope.newUser.firstname = $scope.readCookie(data, "firstname");
			$scope.newUser.lastname = $scope.readCookie(data, "lastname");
			$scope.newUser.userType = $scope.readCookie(data, "userType");
			$scope.newUser.userId = $scope.readCookie(data, "userId");

			$scope.$apply();
			$scope
					.showAlert('',
							"Thanks for signing up. Please complete your registration process..");
		}

		$scope.readCookie = function(cookie, name) {
			var nameEQ = name + "=";
			var ca = cookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ')
					c = c.substring(1, c.length);
				if (c.indexOf(nameEQ) == 0)
					return c.substring(nameEQ.length, c.length);
			}
			return null;
		}

		/**
		 * Wearable link
		 */
		$scope.onLinkWearable = function() {
			pageService.getFitbitUrl().success(function(response) {
				// $scope.open('lg', response);
				//tabWindowId = 
					$window.open(response, '_blank');
				//var timer = setInterval(checkChild, 500);

				/*function checkChild() {
					if (tabWindowId == null) {
						clearInterval(timer);
						return;
					}

					if (tabWindowId.closed) {
						clearInterval(timer);
						tabWindowId = null;
					}
				};*/

			}).error(function(data, status) {
				$scope.showAlert('Bad request !!', data);
			});
		}

		/**
		 * Modal large window.
		 */
		$scope.open = function(size, url) {
			var modalInstance = $uibModal.open({
				animation : true,
				templateUrl : 'modalWindow.html',
				controller : 'FrameModalInstanceCtrl',
				size : size,
				resolve : {
					items : function() {
						return [ url ];
					}
				}
			});

			modalInstance.result.then(function(selectedItem) {
			}, function() {
			});
		};
	}

})();
