var low           = require('lowdb');
var resStrategies = require('./responseStrategies');

module.exports = function(express) {
  console.info('Building server url maps....');
  router = express.Router();
  const configdb = low('./restconf.json');
  var restApis = configdb.get('apis').value();

  restApis.forEach(function (conf) {
    var reqConf = conf.request,
        resConf = conf.response;

    router[reqConf.method.toLowerCase()](reqConf.path, function (req, res) {

      console.log('===>', req.method, req.path);

      res.type(resConf.contentType);
      res.status(resConf.status);
      if (resConf.headers && resConf.headers.length) {
        resConf.headers.forEach((header) => {
          res.set(header.key, header.value)
        });
      }
      resStrategies[resConf.type+'Strategy'](req, res, resConf);
    });
  }, this);
  console.info('Url maps build completely.');
  return  router;
}
