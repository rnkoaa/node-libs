import Consul from "consul";
import { ConsulHealthServiceResponse } from ".";
import { stat } from "fs";
import { HealthService } from "./domains";

export class ConsulOperations {
  private _consulClient;
  constructor() {
    const isSecure = process.env.CONSUL_SECURE === "true";
    const consulOpts = {
      host: process.env.CONSUL_HOST,
      port: process.env.CONSUL_PORT,
      secure: isSecure
    };
    this._consulClient = new Consul(consulOpts);
  }

  getServices(): Promise<HealthService[]> {
    return new Promise((reject, resolve) => {
      reject(undefined);
    });
  }

  getService(name: string, status?: string): Promise<HealthService[]> {
    return new Promise((resolve, reject) => {
      this._consulClient.health.service(name, (err, result) => {
        if (err) {
          reject(err);
        }
        const responses = result as ConsulHealthServiceResponse[];
        const services = responses.map(response => {
          const mServices = [];
          const service = response.Service;
          const checks = response.Checks;
          const checkedServices = checks.filter(check => {
            if (status) {
              return check.ServiceName === name && check.Status === status;
            } else {
              return check.ServiceName === name;
            }
          });
          if (checkedServices.length > 0) {
            mServices.push(service);
          }
          return mServices;
        });

        const flatServices = services.reduce((acc, val) => acc.concat(val), []);
        resolve(flatServices);
      });
    });
  }
}
