var express = require('express');
var cors    = require('cors');
var app     = express();
var ejs     = require('ejs');
var fs      = require('fs');
var argsv   = require('yargs').default('port', 3100).argv;
var routes  = require('./routes');
var router = undefined;

app.use(cors());

router = routes(express);

app.use(function (req, res, next) {
  router(req, res, next);
});

fs.watch('./restconf.json',function (eventType, filename) {
  console.warn(filename + ' changed!');
  router = routes(express);
});

app.listen(argsv.port, function () {
  console.log(`Rest Mock Server is listening on port ${argsv.port}!`)
});
