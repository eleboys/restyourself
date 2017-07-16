var express = require('express');
var cors    = require('cors');
var app     = express();
var ejs     = require('ejs');
var fs      = require('fs');
var argsv   = require('yargs').default('port', 3100).argv;
var routes  = require('./routes');
var router: any = undefined;

app.use(cors());

router = routes(express);

app.use(function (req: any, res: any, next: any) {
  router(req, res, next);
});

fs.watch('./restconf.json',function (eventType:any, filename:any) {
  console.warn(filename + ' changed!');
  router = routes(express);
});

app.listen(argsv.port, function () {
  console.log(`Rest Mock Server is listening on port ${argsv.port}!`)
});
