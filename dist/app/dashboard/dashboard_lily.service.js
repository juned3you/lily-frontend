(function() {
	'use strict';

	angular.module('app').service('dashboardService',
			[ '$q', '$http', "appConfig", DashboardService ]);

	function DashboardService($q, $http, appConfig) {

		this.test = function() {
			 alert("called "+appConfig.server.endpointUrl);
		}
	}
})();