'use strict';

var requestLib = require('request');
require('should');

describe('charts api', function() {
    it('echarts request result length should be 1716796', function(done) {
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        requestLib.post('http://127.0.0.1:3334/echarts', {
            form: {
                config: JSON.stringify(option),
                width: 800,
                height: 400,
                clipRect: { top: 0, left: 16, width: 828, height: 388 }
            }
        }, function(err, rsp, body) {
            if (!err && rsp.statusCode == 200) {
                body.length.should.equal(1716796)
                done()
            }
        })
    })

    it('highcharts request result length should be 1710068', function(done) {
        var option = {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    '电信'
                ]
            },
            yAxis: {
                max:100,
                title: {
                    text: ' (%)'
                }
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                series: {
                    animation: false
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [
                {
                    name: '电信',
                    data: [1,2,3,4,5,6]
                }
            ]
        }

        requestLib.post('http://127.0.0.1:3334/highcharts', {
            form: {
                config: JSON.stringify(option),
                width: 800,
                height: 400,
                clipRect: { top: 0, left: 16, width: 800, height: 400 }
            }
        }, function(err, rsp, body) {
            if (!err && rsp.statusCode == 200) {
                body.length.should.equal(1710068)
                done()
            }
        })
    })
})
