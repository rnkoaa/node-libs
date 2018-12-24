const { promisify } = require('util');
const { DataStore } = require("./data-store");

function fromCallback(fn) {
  return new Promise(function (resolve, reject) {
    try {
      return fn(function (err, data, res) {
        if (err) {
          err.res = res;
          return reject(err);
        }
        return resolve([data, res]);
      });
    } catch (err) {
      return reject(err);
    }
  });
}

const datastore = new DataStore();
const consul = require('consul')({
  promisify: fromCallback,
  host: 'loc alhost',
  port: 8500,
  secure: false
});
const consulHealthServiceAsync = promisify(consul.health.service);
const services = ["apricot"]


// method: consul.health.service,
// method: consul.catalog.service.list,
const watcher = consul.watch({
  method: consul.catalog.service.list,
  options: {
    passing: true
  }
});
// const watcher = consul.watch({
//   method: consul.health.state,
//   options: {
//     state: 'passing'
//   }
// });

watcher.on('error', function (err) {
  console.log(`Encountered watch error: ${err}`)
});

watcher.on('cancel', function () {
  console.log('Watching Cancelled.')
});

watcher.on('change', data => {
  known_data_instances = [];
  const serviceNames = Object.keys(data);
  const promises = serviceNames.map(service => consulHealthServiceAsync(service));
  Promise.all(promises)
    .then(receipts => {
      const serviceInstances = [];
      receipts.forEach(serviceArray => {
        serviceArray.forEach(instance => {
          const serviceInstance = instance.Service
          const instanceObject = {};
          instanceObject.instanceId = serviceInstance.ID
          instanceObject.serviceName = serviceInstance.Service
          instanceObject.serviceAddress = `${serviceInstance.Address}:${serviceInstance.Port}`
          instanceObject.address = serviceInstance.Address
          instanceObject.port = serviceInstance.Port
          instanceObject.modifyIndex = serviceInstance.ModifyIndex
          instanceObject.createIndex = serviceInstance.CreateIndex
          serviceInstances.push(instanceObject);
          datastore.addInstances(serviceInstances);

        })
      })

      console.log(datastore.findInstancesByName("apricot"))
    }).catch(err => `There are errors seen`);
});
