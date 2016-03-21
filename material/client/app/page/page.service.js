(function() {
	'use strict';

	angular.module('app').service('pageService',
			[ '$q', '$http', "appConfig", PageService ]);

	function PageService($q, $http, appConfig) {

		/**
		 * Login endpoint.
		 */
		this.login = function(user) {
			return $http({
				url : appConfig.server.loginUrl,
				method : "POST",
				data : user,
				headers : appConfig.server.jsonHeaders
			});
		}
		
		/**
		 * User create endpoint.
		 */
		this.createUser = function(user) {
			return $http({
				url : appConfig.server.registerUrl,
				method : "POST",
				data : user,
				headers : appConfig.server.jsonHeaders
			});
		}
		
		/**
		 * Get fitbit url to open in Iframe.
		 */
		this.getFitbitUrl = function() {
			return $http({
				url : appConfig.server.fitbitAuthUrl,
				method : "GET",				
				headers : appConfig.server.jsonHeaders
			});
		}
	}
})();