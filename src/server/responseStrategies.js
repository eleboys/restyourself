var ejs     = require('ejs');
var low1    = require('lowdb');
var datadb  = low1('./data.json');


module.exports.javascriptStrategy = javascriptStrategy;
module.exports.ejsStrategy = ejsStrategy;
module.exports.jsonStrategy = commonStrategy;
module.exports.textStrategy = commonStrategy;


function javascriptStrategy(req, res, resConf) {
  var fnStr = "("+ resConf.body+ ")",
      fnBody = eval(fnStr);
  res.send(fnBody(req, res));
}

function ejsStrategy(req, res, resConf) {
  res.send(ejs.render(resConf.body, { req: req, res: res, db: datadb}));
}

function commonStrategy(req, res, resConf) {
  res.send(resConf.body);
}
