var express = require('express');
var low = require('lowdb');
var low1 = require('lowdb');
var cors = require('cors');
var app = express();
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var router: any = undefined;
app.use(cors());

buildRouteMap();

app.use(function (req: any, res: any, next: any) {
  // this needs to be a function to hook on whatever the current router is
  router(req, res, next);
});

fs.watch('./restconf.json',function (eventType:any, filename:any) {
  console.warn(filename + ' changed!');
  buildRouteMap();
});

app.listen(3100, function () {
  console.log('Rest Mock Server is listening on port 3100!')
});


function buildRouteMap() {

  console.info('Building server url maps....');
  router = express.Router();
  const configdb = low('./restconf.json');
  const datadb   = low1('./data.json');
  var restApis = configdb.get('apis').value();

  restApis.forEach(function (conf: any) {
    var reqConf = conf.request,
        resConf = conf.response;

    router[reqConf.method.toLowerCase()](reqConf.path, function (req: any, res: any) {

      console.log('===>', req.method, req.path);

      res.type(resConf.contentType);
      res.status(resConf.status);
      if (resConf.headers && resConf.headers.length) {
        resConf.headers.forEach((header:any) => {
          res.set(header.key, header.value)
        });
      }
      if (resConf.type === 'javascript') {
        var fnStr = "("+ resConf.body+ ")",
            fnBody = eval(fnStr);

        res.send(fnBody(req, res));
      } else if (resConf.type==='ejs') {
        res.send(ejs.render(resConf.body, { req: req, res: res, db: datadb}));
      } else {
        res.send(resConf.body);
      }
    });
  }, this);
  console.info('Url maps build completely.');
}




