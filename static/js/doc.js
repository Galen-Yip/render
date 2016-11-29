;(function() {
    var converter = new showdown.Converter({tables: true});

    var val = `
## API文档

---

#### highcharts 

* POST http://render.oa.com/highcharts

##### params

Content-Type should be application/json, params include:

name              | type    | notes
:-----------------|:--------|:------------
chartConfig|object|**required**, hightcharts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }


##### response

return the base64 of chart image.

<br>

---

<br>

#### echarts

* POST http://render.oa.com/echarts

##### params

Content-Type should be application/json, params include:

name              | type    | notes
:-----------------|:--------|:------------
chartConfig|object|**required**, echarts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }


##### response

return the base64 of chart image.

`

    var md_html = converter.makeHtml(val);
    console.log(md_html)
    $('.md_res').html(md_html)
})()
