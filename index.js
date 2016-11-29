'use strict';

/*
debug run with: 
$ NODE_ENV=development nodemon index.js

tar with:
$ tar --exclude node_modules --exclude .git --exclude .idea -zcvf render.tar.gz render
 */

var express = require('express');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var bodyParser = require('body-parser')
var fs = require('fs');
var _ = require('lodash');
var moment = require('moment');
var pathLib = require('path');
var chartsController = require('./controller/charts');
var config = require('./config')
var showdown = require('showdown')
var mdConverter = new showdown.Converter({tables: true});

var staticDir = pathLib.join(__dirname, './static');

var app = express();

app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());

app.post('/:chart_type', chartsController);

app.get('/', function(req, res, next) {
	var indexContent = fs.readFileSync(pathLib.join(staticDir, 'index.html'), 'utf-8')

	res.send(_.template(indexContent)({
		// config 必须有选择的暴露字段，不能全部暴露出去
		config: {
			backend_api: config.backend_api
		}
	}))
});
app.get('/doc', function(req, res, next) {
	var docContent = fs.readFileSync(pathLib.join(staticDir, 'doc.html'), 'utf-8')
	var readmeContent = fs.readFileSync(pathLib.join(__dirname, 'README.md'), 'utf-8')

	res.send(_.template(docContent)({
		readme: mdConverter.makeHtml(readmeContent)
	}))
});
app.get('/about', function(req, res, next) {
    res.sendFile(pathLib.join(staticDir, 'about.html'));
});
app.use(express.static(staticDir));

app.listen(config.port);
console.log(`render server start at port ${config.port}`);

