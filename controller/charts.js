'use strict';

var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var pathLib = require('path');
var urlLib = require('url');
var phantom = require('phantom');
var utility = require('utility');
var highchartsLayout = fs.readFileSync(getAbsolutePath('../layout/highcharts.html'), 'utf-8');
var echartsLayout = fs.readFileSync(getAbsolutePath('../layout/echarts.html'), 'utf-8');

var distPath = getAbsolutePath('../dist');
var htmlDistPath = pathLib.join(distPath, 'html');
var imgDistPath = pathLib.join(distPath, 'img');

(function createFileDir() {
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath)
    }
    if (!fs.existsSync(htmlDistPath)) {
        fs.mkdir(htmlDistPath, function(err) {
            if(err) throw err
        })
    }
    if (!fs.existsSync(imgDistPath)) {
        fs.mkdir(imgDistPath, function(err) {
            if(err) throw err
        })
    }
})()

function getAbsolutePath(path) {
    return pathLib.join(__dirname, path);
}

function fixPhantomPath(path) {
    var isWin = /^win/.test(process.platform);

    if (isWin) {
        path = path.slice(2).replace(/\\/g, '/');
    }

    return path;
}

function renderChart(req, res, next) {
    var chartConfig = req.body.config || req.query.config;
    var chartWidth = Number(req.body.width || req.query.width);
    var chartHeight = Number(req.body.height || req.query.height);
    var options = {
        clipRect: req.body.clipRect || req.query.clipRect
    }
    var layoutStr;

    switch(req.path) {
        case '/highcharts': 
            layoutStr = highchartsLayout;
            break;
        case '/echarts':
            layoutStr = echartsLayout;
            break;
    }

    if(!_.isString(chartConfig)) {
        return next('require config [string] param')
    }
    if(chartWidth && !_.isNumber(chartWidth)) {
        return next('width should be a positive number')
    }
    if(chartHeight && !_.isNumber(chartHeight)) {
        return next('height should be a positive number')
    }
    if(options.clipRect && !_.isObject(options.clipRect)) {
        return next('clipRect should be an object')
    }

    chartWidth = chartWidth || 800;
    chartHeight = chartHeight || 400;
    options.clipRect = options.clipRect || { top: 0, left: 0, width: 800, height: 400 };

    var nowTimeStamp = moment().format('x');
    var configMd5 = utility.md5(chartConfig);
    var chartHtmlPath = pathLib.join(htmlDistPath,`${configMd5}_${nowTimeStamp}.html`);
    var imgPath = pathLib.join(imgDistPath,`${configMd5}_${nowTimeStamp}.png`);

    var chartHtmlStr = ejs.render(layoutStr, { chartConfig, chartWidth, chartHeight });

    fs.writeFile(chartHtmlPath, chartHtmlStr, function (err) {
        if (err) {
            return next(err);
        }

        var urlPath = fixPhantomPath(chartHtmlPath);

        generateImg(urlPath, imgPath, options)
            .then(function() {
                console.log('img done');

                var base64 = new Buffer(fs.readFileSync(imgPath)).toString('base64');
                res.send(base64);

                fs.unlink(chartHtmlPath);
                fs.unlink(imgPath);
            })
            .catch(function (e) {
                return next(e);
            });
    });
}

function generateImg(url, dist, options) {
    var sitepage = void 0;
    var phInstance = void 0;
    return phantom.create().then(function (instance) {
        phInstance = instance;
        return instance.createPage();
    }).then(function (page) {
        sitepage = page;
        return page.open(url);
    }).then(function (status) {
        console.log(status);
        sitepage.property('viewportSize', options.viewportSize);
        sitepage.property('clipRect', options.clipRect);
        return sitepage.property('content');
    }).then(function (content) {
        return sitepage.render(dist, { format: 'png', quality: '100' }).then(function() {
            sitepage.close();
            phInstance.exit();
        })
    }).catch(function (error) {
        throw new Error(error)
        phInstance.exit();
    });
}

module.exports = renderChart;

if (!module.parent) {
    renderChart();
}