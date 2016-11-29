'use strict';

var ejs = require('ejs');
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var pathLib = require('path');
var urlLib = require('url');
var phantom = require('phantom');
var utility = require('utility');
var config = require('../config')
var mkdirp = require('mkdirp')
var highchartsLayout = fs.readFileSync(getAbsolutePath('../layout/highcharts.html'), 'utf-8');
var echartsLayout = fs.readFileSync(getAbsolutePath('../layout/echarts.html'), 'utf-8');

var distPath = getAbsolutePath('../dist');
var htmlDistPath = pathLib.join(distPath, 'html');
var imgDistPath = pathLib.join(distPath, 'img');
var fileNameCount = 0;

// ensure all dir exists
mkdirp(distPath)
mkdirp(htmlDistPath)
mkdirp(imgDistPath)


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
    var chartConfig = req.body.chartConfig;
    var chartWidth = Number(req.body.width);
    var chartHeight = Number(req.body.height);
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

    if(!_.isObject(chartConfig)) {
        return next('`chartConfig` should be an object')
    }
    if(chartWidth && !_.isNumber(chartWidth)) {
        return next('`width` should be a positive number')
    }
    if(chartHeight && !_.isNumber(chartHeight)) {
        return next('`height` should be a positive number')
    }
    if(options.clipRect && !_.isObject(options.clipRect)) {
        return next('`clipRect` should be an object')
    }

    var chartConfigStr = JSON.stringify(chartConfig)
    chartWidth = chartWidth || 800;
    chartHeight = chartHeight || 400;
    options.clipRect = options.clipRect || { top: 0, left: 0, width: 800, height: 400 };

    var nowTimeStamp = moment().format('x');
    var configMd5 = utility.md5(chartConfigStr);
    var filename = String(fileNameCount++)
    var chartHtmlPath = pathLib.join(htmlDistPath,`${filename}.html`);
    var imgPath = pathLib.join(imgDistPath,`${filename}.png`);

    var chartHtmlStr = ejs.render(layoutStr, { chartConfigStr, chartWidth, chartHeight });

    fs.writeFile(chartHtmlPath, chartHtmlStr, function (err) {
        if (err) {
            return next(err);
        }

        var urlPath = fixPhantomPath(chartHtmlPath);

        generateImg(urlPath, imgPath, options)
            .then(function() {
                fs.readFile(imgPath, function(err, imgBuffer) {
                    if (err) {return next(err)};

                    var base64 = imgBuffer.toString('base64');
                    res.send(base64);

                    fs.unlink(chartHtmlPath);
                    fs.unlink(imgPath);
                });
            })
            .catch(function (e) {
                console.log('error', e.timestamp)
                return next(e.error);
            });
    });
}

function generateImg(url, dist, options) {
    var sitepage = void 0;
    var phInstance = void 0;
    return new Promise(function(resolve, reject) {
        phantom.create().then(function (instance) {
            phInstance = instance;
            return instance.createPage();
        }).then(function (page) {
            sitepage = page;
            return page.open(url);
        }).then(function (status) {
            sitepage.property('viewportSize', options.viewportSize);
            sitepage.property('clipRect', options.clipRect);
            return sitepage.property('content');
        }).then(function (content) {
            sitepage.render(dist, { format: 'png', quality: '100' }).then(function() {
                console.log('img done', dist);
                sitepage.close();
                phInstance.exit();
                resolve()
            })
        }).catch(function (error) {
            phInstance.exit();
            reject({error, timestamp})
        });
    })
}

module.exports = renderChart;

if (!module.parent) {
    renderChart();
}