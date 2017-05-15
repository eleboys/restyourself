var express = require('express');
var restConfig = require('./rest.conf.json');
var app = express();


restConfig.forEach(function(conf) {
    var reqConf = conf.request,
        resConf = conf.response;
    app[reqConf.method](reqConf.path, function (req, res) {
        res.type(resConf.contentType);
        res.status(resConf.status);
        res.set(resConf.headers);
        res.send(resConf.body);
    });
}, this);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});