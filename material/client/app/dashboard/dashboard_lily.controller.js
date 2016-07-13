(function() {
	'use strict';

	angular.module('app').controller(
			'DashboardLilyCtrl',
			[ '$scope', '$rootScope', '$window', '$location', '$mdDialog',
					'$filter', 'dashboardService', 'pageService',
					DashboardLilyCtrl ])

	function DashboardLilyCtrl($scope, $rootScope, $window, $location,
			$mdDialog, $filter, dashboardService, pageService) {

		$scope.newUser = $rootScope.user;
		$scope.monthlyCompletionResponse = {
			monthlyGoalCompletionPoints : 0,
			monthlyGrowthPercentage : 0,
			monthlyGrowth : 0
		};

		$scope.dashboardData = {
			monthlyGoalCompletion : {},
			friendsData : {},
			weeklyGoalCompletionPercentage : 0.0
		};

		$scope.showAlert = function(title, msg) {
			$mdDialog.show($mdDialog.alert().parent(
					angular.element(document.querySelector('#popupContainer')))
					.clickOutsideToClose(true).title(title).content(msg)
					.ariaLabel(msg).ok('Ok')
			// .targetEvent(ev)
			);
		};

		$scope.isUserLoggedIn = function() {
			if ($rootScope.user == undefined || $rootScope.user == null
					|| $rootScope.user.email == null) {
				$scope
						.showAlert("User is not signed in. Redirecting it to login page..");
				$location.url('/page/signin')
				return;
			}
		}

		/*
		 * if($window.location.hash == '#/dashboard'){ $scope.isUserLoggedIn(); }
		 */

		/**
		 * read values values from cookies.
		 */
		/*
		 * $window.callback = function(data) { $rootScope.user.userType =
		 * $scope.readCookie(data, "userType"); $rootScope.user.userId =
		 * $scope.readCookie(data, "userId"); $scope.callLinkToWearable(); }
		 */

		$scope.logout = function() {
			$rootScope.user = null;
			$location.url('/')
		}

		$scope.onHome = function() {
			$location.url('/dashboard')
		}

		$scope.onSettings = function() {
			// $scope.newUser = $rootScope.user;
			console.log($scope.newUser);
			$location.url('/page/settings');
			// $scope.$apply();
		}

		$scope.onSaveSettings = function() {
			if (!$scope.canSubmitSettings())
				return;

			if ($scope.newUser.password != $scope.newUser.repassword) {
				$scope.showAlert('Password',
						"Password and Retype password doesn't match.");
				return;
			}

			dashboardService.updateUser($scope.newUser).success(
					function(response) {
						$rootScope.user = {};
						$rootScope.user = response;
						$scope
								.showAlert('Info',
										"Settings saved successfully.");
					}).error(function(data, status) {
				$scope.showAlert('Error', data);
			});

		}

		$scope.canSubmitSettings = function() {
			return $scope.settingsForm.$valid;
		};

		/*
		 * $scope.readCookie = function(cookie, name) { var nameEQ = name + "=";
		 * var ca = cookie.split(';'); for (var i = 0; i < ca.length; i++) { var
		 * c = ca[i]; while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		 * if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,
		 * c.length); } return null; }
		 */

		/**
		 * Wearable link
		 */
		/*
		 * $scope.onLinkWearable = function() {
		 * pageService.getFitbitUrl().success(function(response) {
		 * $window.open(response, '_blank');
		 * 
		 * }).error(function(data, status) { $scope.showAlert('Bad request !!',
		 * data); }); }
		 */

		/**
		 * Call server to link wearable.
		 */
		$scope.callLinkToWearable = function() {
			dashboardService.linktoWearable($rootScope.user).success(
					function(response) {
						$rootScope.user = {};
						$rootScope.user = response;
						$scope.showAlert('', "Your wearable ("
								+ $rootScope.user.encodedId
								+ ") is linked successfully.");
					}).error(function(data, status) {
				$scope.showAlert('Bad request !!', data);
			});
		}

		$scope.combo = {};
		$scope.combo.options = {
			legend : {
				show : true,
				x : 'right',
				y : 'top',
				data : [ 'WOM', 'Viral', 'Paid' ]
			},
			grid : {
				x : 40,
				y : 60,
				x2 : 40,
				y2 : 30,
				borderWidth : 0
			},
			tooltip : {
				show : true,
				trigger : 'axis',
				axisPointer : {
					lineStyle : {
						color : $scope.color.gray
					}
				}
			},
			xAxis : [ {
				type : 'category',
				axisLine : {
					show : false
				},
				axisTick : {
					show : false
				},
				axisLabel : {
					textStyle : {
						color : '#607685'
					}
				},
				splitLine : {
					show : false,
					lineStyle : {
						color : '#f3f3f3'
					}
				},
				data : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
						16, 17, 18, 19, 20 ]
			} ],
			yAxis : [ {
				type : 'value',
				axisLine : {
					show : false
				},
				axisTick : {
					show : false
				},
				axisLabel : {
					textStyle : {
						color : '#607685'
					}
				},
				splitLine : {
					show : true,
					lineStyle : {
						color : '#f3f3f3'
					}
				}
			} ],
			series : [
					{
						name : 'WOM',
						type : 'bar',
						clickable : false,
						itemStyle : {
							normal : {
								color : $scope.color.gray
							},
							emphasis : {
								color : 'rgba(237,240,241,.7)'
							}
						},
						barCategoryGap : '50%',
						data : [ 75, 62, 45, 60, 73, 50, 31, 56, 70, 63, 49,
								72, 76, 67, 46, 51, 69, 59, 85, 67, 56 ],
						legendHoverLink : false,
						z : 2
					},
					{
						name : 'Viral',
						type : 'line',
						smooth : true,
						itemStyle : {
							normal : {
								color : $scope.color.success,
								areaStyle : {
									color : 'rgba(139,195,74,.7)',
									type : 'default'
								}
							}
						},
						data : [ 0, 0, 0, 5, 20, 15, 30, 28, 25, 40, 60, 40,
								43, 32, 36, 23, 12, 15, 2, 0, 0 ],
						symbol : 'none',
						legendHoverLink : false,
						z : 3
					},
					{
						name : 'Paid',
						type : 'line',
						smooth : true,
						itemStyle : {
							normal : {
								color : $scope.color.info,
								areaStyle : {
									color : 'rgba(0,188,212,.7)',
									type : 'default'
								}
							}
						},
						data : [ 0, 0, 0, 0, 1, 6, 15, 8, 16, 9, 25, 12, 50,
								20, 25, 12, 2, 1, 0, 0, 0 ],
						symbol : 'none',
						legendHoverLink : false,
						z : 4
					} ]
		};

		// 
		$scope.smline1 = {};
		$scope.smline2 = {};
		$scope.smline3 = {};
		$scope.smline4 = {};
		$scope.smline1.options = {
			tooltip : {
				show : false,
				trigger : 'axis',
				axisPointer : {
					lineStyle : {
						color : $scope.color.gray
					}
				}
			},
			grid : {
				x : 1,
				y : 1,
				x2 : 1,
				y2 : 1,
				borderWidth : 0
			},
			xAxis : [ {
				type : 'category',
				show : false,
				boundaryGap : false,
				data : [ 1, 2, 3, 4, 5, 6, 7 ]
			} ],
			yAxis : [ {
				type : 'value',
				show : false,
				axisLabel : {
					formatter : '{value} °C'
				}
			} ],
			series : [ {
				name : '*',
				type : 'line',
				symbol : 'none',
				data : [ 11, 11, 15, 13, 12, 13, 10 ],
				itemStyle : {
					normal : {
						color : $scope.color.info
					}
				}
			} ]
		};
		$scope.smline2.options = {
			tooltip : {
				show : false,
				trigger : 'axis',
				axisPointer : {
					lineStyle : {
						color : $scope.color.gray
					}
				}
			},
			grid : {
				x : 1,
				y : 1,
				x2 : 1,
				y2 : 1,
				borderWidth : 0
			},
			xAxis : [ {
				type : 'category',
				show : false,
				boundaryGap : false,
				data : [ 1, 2, 3, 4, 5, 6, 7 ]
			} ],
			yAxis : [ {
				type : 'value',
				show : false,
				axisLabel : {
					formatter : '{value} °C'
				}
			} ],
			series : [ {
				name : '*',
				type : 'line',
				symbol : 'none',
				data : [ 11, 10, 14, 12, 13, 11, 12 ],
				itemStyle : {
					normal : {
						color : $scope.color.success
					}
				}
			} ]
		};
		$scope.smline3.options = {
			tooltip : {
				show : false,
				trigger : 'axis',
				axisPointer : {
					lineStyle : {
						color : $scope.color.gray
					}
				}
			},
			grid : {
				x : 1,
				y : 1,
				x2 : 1,
				y2 : 1,
				borderWidth : 0
			},
			xAxis : [ {
				type : 'category',
				show : false,
				boundaryGap : false,
				data : [ 1, 2, 3, 4, 5, 6, 7 ]
			} ],
			yAxis : [ {
				type : 'value',
				show : false,
				axisLabel : {
					formatter : '{value} °C'
				}
			} ],
			series : [ {
				name : '*',
				type : 'line',
				symbol : 'none',
				data : [ 11, 10, 15, 13, 12, 13, 10 ],
				itemStyle : {
					normal : {
						color : $scope.color.danger
					}
				}
			} ]
		};
		$scope.smline4.options = {
			tooltip : {
				show : false,
				trigger : 'axis',
				axisPointer : {
					lineStyle : {
						color : $scope.color.gray
					}
				}
			},
			grid : {
				x : 1,
				y : 1,
				x2 : 1,
				y2 : 1,
				borderWidth : 0
			},
			xAxis : [ {
				type : 'category',
				show : false,
				boundaryGap : false,
				data : [ 1, 2, 3, 4, 5, 6, 7 ]
			} ],
			yAxis : [ {
				type : 'value',
				show : false,
				axisLabel : {
					formatter : '{value} °C'
				}
			} ],
			series : [ {
				name : '*',
				type : 'line',
				symbol : 'none',
				data : [ 11, 12, 8, 10, 15, 12, 10 ],
				itemStyle : {
					normal : {
						color : $scope.color.warning
					}
				}
			} ]
		};

		// Engagment pie charts
		var labelTop = {
			normal : {
				color : $scope.color.primary,
				label : {
					show : true,
					position : 'center',
					formatter : '{b}',
					textStyle : {
						color : '#1A1A1A',
						baseline : 'top',
						fontSize : 14
					}
				},
				labelLine : {
					show : false
				}
			}
		};
		var labelFromatter = {
			normal : {
				label : {
					formatter : function(params) {
						return 100 - params.value + '%'
					},
					textStyle : {
						color : $scope.color.text,
						baseline : 'bottom',
						fontSize : 36
					}
				}
			},
		}
		var labelBottom = {
			normal : {
				color : '#f1f1f1',
				label : {
					show : true,
					position : 'center'
				},
				labelLine : {
					show : false
				}
			}
		};
		var radius = [ 90, 98 ];
		$scope.pie = {};
		$scope.pie.options1 = {};
		$scope.pie.options2 = {};
		$scope.line2 = {};
		$scope.line2.options = {};

		// Get Monthly Completion response
		if ($rootScope.user != null && $rootScope.user != undefined) {
			dashboardService.getDashboardData($rootScope.user).success(
					function(response) {
						$scope.dashboardData = {};
						$scope.dashboardData = response;
						$scope.updateMonthlyCompletionChart();
						$scope.updateWeeklyGrowthChart();
						$scope.updateLast30DaysChart();
					}).error(function(data, status) {
				$scope.showAlert('Error', data);
			});
		}

		/**
		 * Update Monthly growth chart.
		 */
		$scope.updateMonthlyCompletionChart = function() {
			$scope.monthlyCompletionResponse = {};
			$scope.monthlyCompletionResponse = $scope.dashboardData.monthlyGoalCompletion;

			$scope.pie.options1 = {};
			$scope.pie.options1.series = [];

			var goalPer = $filter('number')
					($scope.monthlyCompletionResponse.monthlyGrowthPercentage,
							2);

			var mtly = {
				name : 'Monthly Goal Completion',
				value : goalPer,
				itemStyle : labelTop
			}

			var other = {
				name : 'other',
				value : (100 - goalPer),
				itemStyle : labelBottom
			};

			var data = [];
			data.push(mtly);
			data.push(other);

			var seriesOne = {
				type : 'pie',
				center : [ '50%', '50%' ],
				radius : radius,
				itemStyle : labelFromatter,
				data : data
			};
			$scope.pie.options1.series.push(seriesOne);
		}

		/**
		 * Update Week/Week growth chart.
		 */
		$scope.updateWeeklyGrowthChart = function() {
			$scope.weeklyGoalCompletionPercentage = 0.0;
			$scope.weeklyGoalCompletionPercentage = $scope.dashboardData.weeklyGoalCompletionPercentage;

			$scope.pie.options2 = {};
			$scope.pie.options2.series = [];

			var goalPer = $filter('number')(
					$scope.weeklyGoalCompletionPercentage, 2);

			var mtly = {
				name : 'Week/Week Growth',
				value : goalPer,
				itemStyle : labelTop
			}

			var other = {
				name : 'other',
				value : (100 - goalPer),
				itemStyle : labelBottom
			};

			var data = [];
			data.push(mtly);
			data.push(other);

			var seriesOne = {
				type : 'pie',
				center : [ '50%', '50%' ],
				radius : radius,
				itemStyle : labelFromatter,
				data : data
			};
			$scope.pie.options2.series.push(seriesOne);
		}

		/**
		 * Update last 30 days chart.
		 */
		$scope.updateLast30DaysChart = function() {
			$scope.line2.options = {};
			$scope.line2.options.tooltip = {
				trigger : 'axis'
			};
			$scope.line2.options.legend = {};
			$scope.line2.options.legend.data = [];
			$scope.line2.options.toolbox = {
				show : false,
				feature : {
					restore : {
						show : true,
						title : "restore"
					},
					saveAsImage : {
						show : true,
						title : "save as image"
					}
				}
			};

			$scope.line2.options.calculable = true;
			$scope.line2.options.xAxis = [];
			$scope.line2.options.series = [];

			$scope.line2.options.yAxis = [ {
				type : 'value'
			} ];

			var xAxisData = {
				type : 'category',
				boundaryGap : false,
				data : $scope.dashboardData.chartData['xAxisDataLabel']
			};

			$scope.line2.options.xAxis.push(xAxisData);

			angular.forEach($scope.dashboardData.chartData['legends'],
					function(value, key) {
						$scope.line2.options.legend.data.push(value);
					}, []);

			angular.forEach($scope.dashboardData.chartData['seriesData'],
					function(value, key) {
						value.type = "line";
						value.markPoint = {
							data : [ {
								type : 'max',
								name : 'Max'
							} ]
						};						
						$scope.line2.options.series.push(value);
					}, []);
		}
	}
})();
