var ejs     = require('ejs');
var datadb  = require('lowdb')('./data.json');
var uuid    = require('uuid/v1');


module.exports.javascriptStrategy = javascriptStrategy;
module.exports.ejsStrategy = ejsStrategy;
module.exports.jsonStrategy = commonStrategy;
module.exports.textStrategy = commonStrategy;


function javascriptStrategy(req, res, resConf) {
  var fnStr = "("+ resConf.body+ ")",
      fnBody = eval(fnStr);
  res.send(fnBody(req, res, datadb, uuid));
}

function ejsStrategy(req, res, resConf) {
  res.send(ejs.render(resConf.body, { req: req, res: res, db: datadb, uuid: uuid}));
}

function commonStrategy(req, res, resConf) {
  res.send(resConf.body);
}
