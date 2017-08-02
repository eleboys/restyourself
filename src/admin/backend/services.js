var low = require('lowdb');
var db1 = low('./restconf.json');

db1.defaults({ apis: [], idSeed: 1 }).write();

module.exports = {
  createApi: createApi,
  updateApi: updateApi,
  deleteApiById: deleteApiById,
  getAllApis: getAllApis,
  getApiById: getApiById
}

function getApiById(id) {
  return db1.get('apis')
    .find({ id: id })
    .value();
}

function getAllApis() {
  return db1.get('apis').value();
}

function createApi(apiVm) {
  var id = db1.get('idSeed').value();
  var api = apiVmToDto(apiVm);
  id++;
  api.id = id;
  db1.get('apis').push(api).write();
  db1.set('idSeed', id).write();
  return api;
}

function updateApi(apiVm) {
  db1.get('apis')
    .find({ id: apiVm.id })
    .assign(apiVmToDto(apiVm))
    .write();
}

function deleteApiById(id) {
  db1.get('apis')
     .remove({id: id})
     .write();
}

function apiVmToDto(apiVm) {
  return {
			tags: apiVm.tags,
      request: {
        path: apiVm.path,
        method: apiVm.method
      }, response: {
        status: apiVm.status,
        contentType: apiVm.contentType,
        type: apiVm.type,
        body: apiVm.body,
        headers: apiVm.headers || []
      }
    };
}
