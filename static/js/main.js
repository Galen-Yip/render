;(function() {
    $(document).ready(function() {
        $('.index-banner').particleground({
            dotColor: '#5cbdaa',
            lineColor: '#5cbdaa'
        });

        var app = new Vue({
            el: '.main-container',
            data: {
                chartConfig: 
`{
    title: {
        text: 'Monthly Average Temperature',
        x: -20 //center
    },
    subtitle: {
        text: 'Source: WorldClimate.com',
        x: -20
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {
        title: {
            text: 'Temperature (°C)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valueSuffix: '°C'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: 'Tokyo',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'New York',
        data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
    }, {
        name: 'Berlin',
        data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
    }, {
        name: 'London',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
}`,
                chartType: 'highcharts',
                chartWidth: 500,
                chartHeight: 400,
                // chartImgData: '',
                config: window.__render_config,
            },
            computed: {
                chartConfigObj: function () {
                    var obj;
                    try {
                        obj = eval('(' + this.chartConfig + ')')
                    } catch (e) {
                        obj = '非法json格式'
                    }
                    return obj;
                },
                requestBody: function () {
                    return ({
                        chartConfig: this.chartConfigObj,
                        width: this.chartWidth,
                        height: this.chartHeight,
                        clipRect: {
                            top: 0,
                            left: 0,
                            width: this.chartWidth,
                            height: this.chartHeight
                        }
                    })
                },
                requestBodyStr: function () {
                    return JSON.stringify(this.requestBody)
                }
            },
            methods: {
                generateImg: function() {
                    var self = this;
                    $.ajax({
                        url: self.config.backend_api + '/' + self.chartType,
                        type: 'POST',
                        data: self.requestBodyStr,
                        'contentType': 'application/json',
                    }).done(function(base64) {
                        // self.$set('chartImgData', 'data:image/png;base64,' + base64)

                        $('.chart-img-result').html($('<img>', {
                            src: 'data:image/png;base64,' + base64
                        }))
                    }).fail(function(err) {
                        console.log(err)
                    })
                }
            }
        }) 

    });
})()

