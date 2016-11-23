'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser')
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var pathLib = require('path');
var chartsController = require('./controller/charts');

var staticDir = pathLib.join(__dirname, './static');

var app = express();

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(staticDir));

app.all('/highcharts', chartsController);
app.all('/echarts', chartsController);
app.get('/', function(req, res, next) {
    res.sendFile(pathLib.join(staticDir, 'index.html'));
});
app.get('/doc', function(req, res, next) {
    res.sendFile(pathLib.join(staticDir, 'doc.html'));
});
app.get('/about', function(req, res, next) {
    res.sendFile(pathLib.join(staticDir, 'about.html'));
});

var serverPort = 3334;
app.listen(serverPort);
console.log(`render server start at port ${serverPort}`);

