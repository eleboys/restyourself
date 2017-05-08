var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());

app.get('/api/configs', function (req: any, res: any) {
  var configs = require('./restconf.json');
  res.type('application/json');
  res.send(configs);
})

app.listen(3101, function () {
  console.log('Example app listening on port 3101!')
});
