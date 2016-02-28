(function() {
	'use strict';

	angular.module('app').service('pageService',
			[ '$q', '$http', "appConfig", PageService ]);

	function PageService($q, $http, appConfig) {

		/**
		 * Login endpoint.
		 */
		this.login = function(user) {
			return $q(function(resolve, reject) {
				$http({
					url :  appConfig.server.loginUrl,
					method : "POST",
					data : user,
					headers : appConfig.server.jsonHeaders
				}).success(function(response) {
					resolve(response);
				}).error(function(data, status) {
					reject({
						data : data,
						status : status
					});
				});
			});
		}
	}
})();