"use strict";

import { ServiceInstance, ConsulOperations, HealthService } from ".";
import { ServiceInstanceCache } from "./service-instance-cache";
export class RoundRobinLoadBalancingStrategy {
  private _serviceInstances: ServiceInstance[];
  private _executedServices: ExecutedServiceInstance[] = [];
  private _consulOperations: ConsulOperations;
  private _serviceInstanceCache = ServiceInstanceCache.getInstance();

  constructor(consulOperations: ConsulOperations) {
    this._serviceInstances = [];
    this._consulOperations = consulOperations;
  }

  public async getServiceInstance(instance: string): Promise<ServiceInstance> {
    const instances = this._serviceInstanceCache.get(instance);
    if (instances.length > 0) {
      return new Promise<ServiceInstance>((resolve, reject) => {
        if (instances.length === 1) {
          resolve(instances[0]);
        } else {
          // const index = this.getRandomIndex(instances.length);
          // resolve(this._selectNextInstance(instances));
        }
      });
    } else {
      const healthInstances = await this._consulOperations.getService(instance);
      return new Promise<ServiceInstance>((resolve, reject) => {
        if (instances.length > 0) {
          if (instances.length === 1) {
            resolve(ServiceInstance.convert(healthInstances[0]));
          } else {
            resolve(this._selectNext(healthInstances));
          }
        } else {
          reject(`No Instance Found for ${instance} `);
        }
      });
    }
  }

  private _selectNext(instances: HealthService[]): ServiceInstance {
    let serviceCounter = 0;
    let executedServiceInstance;
    let resultServiceInstance = <ServiceInstance>{};
    const instanceName = instances[0].Service;

    // remove and put new executed service.
    if (this._executedServices.length > 0) {
      executedServiceInstance = this._executedServices.find(service => service.name === instanceName);
      this._executedServices = this._executedServices.filter(service => service.name !== instanceName);
    }

    if (!executedServiceInstance) {
      executedServiceInstance = <ExecutedServiceInstance>{};
      executedServiceInstance.name = instanceName;
      executedServiceInstance.instances = [];
    }

    const executedInstances = executedServiceInstance.instances;
    serviceCounter = executedServiceInstance.counter || 0;

    const instancesToExecute = [];
    instances.forEach(instance => {
      if (!executedInstances.some(item => item.id === instance.ID && !item.executed)) {
        instancesToExecute.push(instance);
      }
    });

    if (instancesToExecute.length === 0) {
      instances.forEach(instance => instancesToExecute.push(instance));
    }

    if (serviceCounter >= instancesToExecute.length) {
      serviceCounter = 0;
    }

    if (instancesToExecute.length > 0) {
      this._sortInstances(instancesToExecute);
      resultServiceInstance = ServiceInstance.convert(instancesToExecute[serviceCounter]);
      resultServiceInstance.executed = true;
      serviceCounter += 1;
      executedServiceInstance.instances.push(resultServiceInstance);
    }

    executedServiceInstance.counter = serviceCounter;
    this._executedServices.push(executedServiceInstance);
    return resultServiceInstance;
  }

  private _sortInstances = (_instances: HealthService[]) => {
    return _instances.sort((first, second) => {
      if (first.ID < second.ID) {
        return -1;
      } else if (first.ID > second.ID) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  private _clearInstances = instances => {
    while (instances.length) {
      instances.pop();
    }
  };

  private _resetExecutedServiceInstance = (executedServiceInstance: ExecutedServiceInstance) => {
    if (executedServiceInstance.counter >= executedServiceInstance.instances.length) {
      executedServiceInstance.counter = 0;
      this._clearInstances(executedServiceInstance.instances);
    }
  };
}

interface ExecutedServiceInstance {
  name: string;
  counter: number;
  instances: ServiceInstance[];
}
