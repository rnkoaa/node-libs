import { HealthCheck, HealthService, HealthNode } from ".";

export class ConsulHealthServiceResponse {
  Checks: HealthCheck[];
  Service: HealthService;
  Node: HealthNode;

  static decode(json: any): ConsulHealthServiceResponse {
    const consulHealthResponse = Object.create(ConsulHealthServiceResponse.prototype);
    return Object.assign(consulHealthResponse, json);
  }
}
