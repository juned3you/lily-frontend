(function () {
    'use strict';

    angular.module('app')
        .controller('DashboardLilyCtrl', ['$scope', DashboardLilyCtrl])

    function DashboardLilyCtrl($scope) {
        // success: #8BC34A 139,195,74
        // info: #00BCD4 0,188,212
        // gray: #EDF0F1 237,240,241

        // Traffic chart
        $scope.combo = {};
        $scope.combo.options = {
            legend: {
                show: true,
                x: 'right',
                y: 'top',
                data: ['WOM', 'Viral', 'Paid']
            },            
            grid: {
                x: 40,
                y: 60,
                x2: 40,
                y2: 30,
                borderWidth: 0
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            },            
            xAxis: [
                {
                    type : 'category',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#607685'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    },
                    data : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
                }
            ],
            yAxis: [
                {
                    type : 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#607685'
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#f3f3f3'
                        }
                    }
                }
            ],
            series: [
                {
                    name:'WOM',
                    type:'bar',
                    clickable: false,
                    itemStyle: {
                        normal: {
                            color: $scope.color.gray
                        },
                        emphasis: {
                            color: 'rgba(237,240,241,.7)'
                        }
                    },
                    barCategoryGap: '50%',
                    data:[75,62,45,60,73,50,31,56,70,63,49,72,76,67,46,51,69,59,85,67,56],
                    legendHoverLink: false,
                    z: 2
                },
                {
                    name:'Viral',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal: {
                            color: $scope.color.success,
                            areaStyle: {
                                color: 'rgba(139,195,74,.7)',
                                type: 'default'
                            }
                        }
                    },
                    data:[0,0,0,5,20,15,30,28,25,40,60,40,43,32,36,23,12,15,2,0,0],
                    symbol: 'none',
                    legendHoverLink: false,
                    z: 3
                },
                {
                    name:'Paid',
                    type:'line',
                    smooth:true,
                    itemStyle: {
                        normal: {
                            color: $scope.color.info,
                            areaStyle: {
                                color: 'rgba(0,188,212,.7)',
                                type: 'default'
                            }
                        }
                    },
                    data:[0,0,0,0,1,6,15,8,16,9,25,12,50,20,25,12,2,1,0,0,0],
                    symbol: 'none',
                    legendHoverLink: false,
                    z: 4
                }
            ]            
        };


        // 
        $scope.smline1 = {};
        $scope.smline2 = {};
        $scope.smline3 = {};
        $scope.smline4 = {};
        $scope.smline1.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            }, 
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },            
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 11, 15, 13, 12, 13, 10],
                    itemStyle: {
                        normal: {
                            color: $scope.color.info
                        }
                    }                    
                }
            ]
        };
        $scope.smline2.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            }, 
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },            
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 10, 14, 12, 13, 11, 12],
                    itemStyle: {
                        normal: {
                            color: $scope.color.success
                        }
                    }                     
                }
            ]
        };
        $scope.smline3.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            }, 
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },            
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 10, 15, 13, 12, 13, 10],
                    itemStyle: {
                        normal: {
                            color: $scope.color.danger
                        }
                    }                 
                }
            ]
        };
        $scope.smline4.options = {
            tooltip: {
                show: false,
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: $scope.color.gray
                    }
                }
            }, 
            grid: {
                x: 1,
                y: 1,
                x2: 1,
                y2: 1,
                borderWidth: 0
            },            
            xAxis : [
                {
                    type : 'category',
                    show: false,
                    boundaryGap : false,
                    data : [1,2,3,4,5,6,7]
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    show: false,
                    axisLabel : {
                        formatter: '{value} °C'
                    }
                }
            ],
            series : [
                {
                    name:'*',
                    type:'line',
                    symbol: 'none',
                    data:[11, 12, 8, 10, 15, 12, 10],
                    itemStyle: {
                        normal: {
                            color: $scope.color.warning
                        }
                    }                      
                }
            ]
        };



        // Engagment pie charts
        var labelTop = {
            normal : {
                color: $scope.color.primary,
                label : {
                    show : true,
                    position : 'center',
                    formatter : '{b}',
                    textStyle: {
                        color: '#999',
                        baseline : 'top',
                        fontSize: 12
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
                    formatter : function (params){
                        return 100 - params.value + '%'
                    },
                    textStyle: {
                        color: $scope.color.text,
                        baseline : 'bottom',
                        fontSize: 20
                    }
                }
            },
        }
        var labelBottom = {
            normal : {
                color: '#f1f1f1',
                label : {
                    show : true,
                    position : 'center'
                },
                labelLine : {
                    show : false
                }
            }
        };        
        var radius = [55, 60];
        $scope.pie = {};
        $scope.pie.options1 = {
            series : [
                {
                    type : 'pie',
                    center : ['12.5%', '50%'],
                    radius : radius,
                    itemStyle : labelFromatter,
                    data : [
                        {name:'Goal Completed', value:54, itemStyle : labelTop},
                        {name:'other', value:46, itemStyle : labelBottom}
                    ]
                }
            ]
        }; 
        
        $scope.pie.options2 = {
                series : [
                    {
                        type : 'pie',
                        center : ['37.5%', '50%'],
                        radius : radius,
                        itemStyle : labelFromatter,
                        data : [
                            {name:'Growth', value:84, itemStyle : labelTop},
                            {name:'other', value:16, itemStyle : labelBottom}
                        ]
                    }
                ]
            }; 
        
        $scope.line2 = {};
        $scope.line2.options = {
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['Win']
                },
                toolbox: {
                    show : true,
                    feature : {
                        restore : {show: true, title: "restore"},
                        saveAsImage : {show: true, title: "save as image"}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['Mon.','Tue.','Wed.','Thu.','Fri.','Sat.','Sun.']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'Win',
                        type:'line',
                        stack: 'Sum',
                        data:[120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name:'Email',
                        type:'line',
                        stack: 'Sum',
                        data:[220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name:'Video Ads',
                        type:'line',
                        stack: 'Sum',
                        data:[150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name:'Direct',
                        type:'line',
                        stack: 'Sum',
                        data:[320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name:'Search',
                        type:'line',
                        stack: 'Sum',
                        data:[50, 58, 100, 150, 79, 120, 140]
                    }
                ]
            };
    }


})(); 
