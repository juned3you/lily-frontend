(function() {
	'use strict';

	angular.module('app').service('dashboardService',
			[ '$q', '$http', "appConfig", DashboardService ]);

	function DashboardService($q, $http, appConfig) {

		this.test = function() {
			 alert("called "+appConfig.server.endpointUrl);
		}
		
		/**
		 * Link existing user to fitbit.
		 */
		this.linktoWearable = function(user) {
			return $http({
				url : appConfig.server.lintToWearableUrl,
				method : "POST",
				data : user,
				headers : appConfig.server.jsonHeaders
			});
		}
	}
})();