import NodeCache from "node-cache";
import { ServiceInstance } from ".";

export class ServiceInstanceCache {
  private static instance: ServiceInstanceCache;
  private _cache = new NodeCache({ stdTTL: 30, checkperiod: 120 });

  private constructor() {}

  static getInstance() {
    if (!ServiceInstanceCache.instance) {
      ServiceInstanceCache.instance = new ServiceInstanceCache();
    }
    return ServiceInstanceCache.instance;
  }

  putOne(serviceInstance: ServiceInstance) {
    this._cache.del(serviceInstance.name);
    const cacheObj = {
      instances: [serviceInstance]
    };
    this._cache.set(serviceInstance.name, cacheObj, 30);
  }
  putMany(serviceInstances: ServiceInstance[]) {
    const serviceName = serviceInstances[0].name;
    this._cache.del(serviceName);
    const cacheObj = {
      instances: serviceInstances
    };
    this._cache.set(serviceName, cacheObj, 30);
  }

  get(serviceName: string): ServiceInstance[] {
    const cacheObj = this._cache.get(serviceName);
    if (cacheObj) {
      return cacheObj["instances"];
    }
    return [];
  }
}
