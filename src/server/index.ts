var express = require('express');
var low = require('lowdb');
var cors = require('cors');
var app = express();

const db = low('./restconf.json');
var restApis = db.get('apis').value();

app.use(cors());

restApis.forEach(function (conf: any) {
  var reqConf = conf.request,
    resConf = conf.response;

  app[reqConf.method.toLowerCase()](reqConf.path, function (req: any, res: any) {
    res.type(resConf.contentType);
    res.status(resConf.status);
    res.set(resConf.headers);
    if (resConf.bodyType === 'function') {
      var fnStr = "("+ resConf.body+ ")",
          fnBody = eval(fnStr);

      res.send(fnBody(req, res));
    } else {
      res.send(resConf.body);
    }
  });


}, this);


app.listen(3100, function () {
  console.log('Example app listening on port 3000!')
});