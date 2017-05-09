var low = require('lowdb');
var db1 = low('./restconf.json');

db1.defaults({ apis:[], idSeed: 1}).write();

module.exports = {
  createApi: createApi,
  getAllApis: getAllApis
}

function getAllApis() {
  return  db1.get('apis').value();
}

function createApi(body: any) {
  var apiVm = body;
  var id = db1.get('idSeed').value();
  var api = {
    id: id,
    request: {
      path: apiVm.path,
      method: apiVm.method
    }, response: {
      status: apiVm.status,
      contentType: apiVm.contentType,
      type: apiVm.type,
      body: apiVm.body
    }
  };
  id++;
  db1.get('apis').push(api).write();
  db1.set('idSeed', id).write();
  return  api;
}
