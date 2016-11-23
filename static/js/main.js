;(function() {
    $(document).ready(function() {
        $('.index-banner').particleground({
            dotColor: '#5cbdaa',
            lineColor: '#5cbdaa'
        });

        var app = new Vue({
            el: '.main-container',
            data: {
                chartConfig: `{
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
            series: [
                {
                    name: '电信',
                    data: [1]
                }
            ]
        }`,
                chartType: 'highcharts',
                chartWidth: 800,
                chartHeight: 400,
                // chartImgData: '',
            },
            methods: {
                generateImg: function() {
                    var self = this;
                    // var chartConfig = $.trim(JSON.stringify(this.chartConfig));
                    console.log(this.chartConfig)
                    var chartConfig = this.chartConfig.replace(/( |\n)/g, '');
                    console.log(chartConfig)
                    $.ajax({
                        url: 'http://127.0.0.1:3334/' + self.chartType,
                        type: 'POST',
                        data: {
                            config: chartConfig,
                            width: self.chartWidth,
                            height: self.chartHeight,
                            clipRect: {
                                top: 0,
                                left: 0,
                                width: self.chartWidth,
                                height: self.chartHeight
                            }
                        }
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

