;(function() {
    var converter = new showdown.Converter({tables: true});

    var val = `
## API文档

---

#### highcharts 

* POST/GET http://render.oa.com/highcharts

##### params

name              | type    | notes
:-----------------|:--------|:------------
config|string|**required**, hightcharts config
width|number|**optional**, chart width, default value :800
height|number|**optional**, chart height, default value :400
clipRect|object|**optional**, viewport to clip, default value : { top: 0, left: 0, width: 800, height: 400 }


##### response

return the base64 of chart image.

<br>

---

<br>

#### echarts

* POST/GET http://render.oa.com/echarts

##### params

name              | type    | notes
:-----------------|:--------|:------------
config|string|**required**, echarts config
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
