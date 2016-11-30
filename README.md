# Render

A server that past a chart config to generate chart image using phantom


<section class="install-stat">

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

</section>

## API

### highcharts 5.x

    POST http://127.0.0.1:3334/highcharts

#### params

Content-Type should be application/json

name              | type    | notes
:-----------------|:--------|:------------
chartConfig|object|**required**, hightcharts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }

```js
// Content-Type should be application/json
{
    chartConfig: {
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
    },
    width: 800,
    height: 400,
    clipRect: { top: 0, left: 0, width: 800, height: 400 }
}
```

#### response

return the base64 of chart image.

---

### echarts 3.x

    POST/GET http://127.0.0.1:3334/echarts

#### params

Content-Type should be application/json

name              | type    | notes
:-----------------|:--------|:------------
chartConfig|object|**required**, echarts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }


```js
// Content-Type should be application/json
{
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    series: [{
        name: '直接访问',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: [320, 302, 301, 334, 390, 330, 320]
    }, {
        name: '邮件营销',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: [120, 132, 101, 134, 90, 230, 210]
    }, {
        name: '联盟广告',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: [220, 182, 191, 234, 290, 330, 310]
    }, {
        name: '视频广告',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: [150, 212, 201, 154, 190, 330, 410]
    }, {
        name: '搜索引擎',
        type: 'bar',
        stack: '总量',
        label: {
            normal: {
                show: true,
                position: 'insideRight'
            }
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
    }]
}
```

#### response

return the base64 of chart image.

<section class="copyright-stat">

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

</section>