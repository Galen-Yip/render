# Render

A server thatpast generate chart image using phantom

## Installing

1.  Install Node.js.

2.  Clone this git repo (fork it first if you plan to make changes).

        git clone https://github.com/Galen-Yip/render.git

3.  Install dependencies.

        cd render && npm install

4.  Start the local server.

        npm start

## Running Tests

```
npm test
```

## API

### highcharts

    POST http://127.0.0.1:3334/highcharts

#### params

name              | type    | notes
:-----------------|:--------|:------------
chartConfig|object|**required**, hightcharts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }

```
// params format should be a json
{
    chartConfig: {
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
    },
    width: 800,
    height: 400,
    clipRect: { top: 0, left: 0, width: 800, height: 400 }
}
```

#### response

return the base64 of chart image.

---

### echarts

    POST/GET http://127.0.0.1:3334/echarts

#### params

name              | type    | notes
:-----------------|:--------|:------------
chartConfig|object|**required**, echarts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }


```
// params format should be a json
{
    chartConfig: {
        title: {
            text: 'ECharts'
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
    },
    width: 800,
    height: 400,
    clipRect: { top: 0, left: 0, width: 800, height: 400 }
}
```

#### response

return the base64 of chart image.

## Contributing

Want to fix a bug? If it's something small, just send a pull request. If you
want to add a new feature or make significant changes, please get in touch and
ask if I'm interested before doing the work.

## License

Copyright (c) 2016 Galen Yip .

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
