var express = require('express');
var low = require('lowdb');
var bodyParser = require('body-parser')
var cors = require('cors');
var multer = require('multer');
var services = require('./services');

var upload = multer();
var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/configs', function (req: any, res: any) {
  var configs = services.getAllApis();
  res.type('application/json');
  res.send(configs);
});

app.post('/api/configs', upload.array(), function (req: any, res: any) {
  var api = services.createApi(req.body);
  res.send(api);
});

app.listen(3101, function () {
  console.log('Example app listening on port 3101!')
});

