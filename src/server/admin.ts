var express    = require('express');
var low        = require('lowdb');
var bodyParser = require('body-parser')
var cors       = require('cors');
var multer     = require('multer');
var services   = require('./services');
var argsv      = require('yargs').default('port', 3101).argv;

var upload = multer();
var app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/configs/:id', function (req: any, res: any) {
  res.type('application/json');
  var api = services.getApiById(parseInt(req.params.id));
  res.send(api);
});

app.get('/api/configs', function (req: any, res: any) {
  var configs = services.getAllApis();
  res.type('application/json');
  res.send(configs);
});

app.post('/api/configs', upload.array(), function (req: any, res: any) {
  var api = services.createApi(req.body);
  res.send(api);
});

app.put('/api/configs', upload.array(), function (req:any, res: any) {
  var api = services.updateApi(req.body);
  res.send(api);
});

app.delete('/api/configs/:id', function (req:any, res: any) {
  services.deleteApiById(parseInt(req.params.id));
  res.send(200);
});

app.get('/export', (req: any, res: any) => {
  res.download('./restconf.json');
});

app.put('/import', (req: any, res: any) => {
  res.download('./restconf.json');
});

app.listen(argsv.port, function () {
  console.log(`Admin rest api provider app listening on port ${argsv.port}!`);
});


