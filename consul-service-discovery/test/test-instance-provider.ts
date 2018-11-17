import { ServiceInstance } from '../lib/types/consul';

export class TestInstanceProvider {
  public static generateOneInstance(): ServiceInstance {
    return <ServiceInstance>{
      id: '2',
      serviceId: 'service-2',
      serviceName: 'service-name-2',
      host: 'localhost',
      port: 8080,
      checkIndex: 0,
    };
  }

  public static multipleInstancesOfSameService(serviceName: string, count: number): Array<ServiceInstance> {
    const instances: Array<ServiceInstance> = [];
    var idx;
    const generatedServiceName = `${serviceName}-${count}`;
    for (idx = 0; idx < count; idx++) {
      instances.push({
        id: `${idx}`,
        serviceId: `${serviceName}-${idx}`,
        serviceName: generatedServiceName,
        host: `localhost-${idx}`,
        port: 8080,
        checkIndex: 0,
      });
    }
    return instances;
  }
}
