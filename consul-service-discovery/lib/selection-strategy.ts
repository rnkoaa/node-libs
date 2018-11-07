// import Datastore from "./types/datastore";

// export class SelectionStrategy {
//     _datastore: Datastore;
//     _lastInstanceIndex = 0;

//     constructor(_ds: Datastore) {
//         this._datastore = _ds;
//     }

//     randomSelector(instanceName: string): any {
//         const storedServicesData = this._datastore.findInstancesByName(instanceName);
//         let serviceData = storedServicesData[Math.floor((Math.random() * storedServicesData.length))];
//         serviceData.serviceUrl = serviceData.secure ? "https://" : "http://" + serviceData.host + ":" + serviceData.port;
//         return serviceData;
//     }


//     roundRobinSelector(instanceName: string): any {
//         const storedServicesData = this._datastore.findInstancesByName(instanceName);
//         let serviceData;

//         if (storedServicesData[++this._lastInstanceIndex]) {
//             serviceData = storedServicesData[this._lastInstanceIndex];
//         } else {
//             this._lastInstanceIndex = 0;
//             serviceData = storedServicesData[0];
//         }

//         serviceData.serviceUrl = serviceData.secure ? "https://" : "http://" + serviceData.host + ":" + serviceData.port;
//         return serviceData;
//     }
// }