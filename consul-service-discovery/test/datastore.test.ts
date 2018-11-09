import { DataStore } from "../lib/data-store";
import { ServiceInstance } from "../lib/types/consul";

test('That a datasore object can be created', () => {
    const datasore = new DataStore();
    expect(datasore).not.toBe(null);
    expect(datasore.instances).not.toBe(null);
    expect(datasore.instances.length).toEqual(0);
})

test('an item can be added to the datastore.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name-1",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    expect(datasore.instances.length).toEqual(1)
})

test('multiple items can be added to the datastore.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name-1",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-2",
        serviceName: "service-name-2",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(2)
})

test('adding an instance with the same service id will override the previous one.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name-1",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-1",
        serviceName: "service-name-2",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(1)
})

test('given an id, a service instance can be found.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name-1",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-2",
        serviceName: "service-name-2",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(2)
    const found = datasore.findById("2");
    expect(found).not.toBe(null)
    expect(found.serviceId).toEqual("service-2")
    expect(found.serviceName).toEqual("service-name-2")
    expect(found.port).toEqual(8080)
    expect(found.host).toEqual("localhost")
})

test('given an id, a service instance that does not exist cannot be found.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name-1",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-2",
        serviceName: "service-name-2",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(2)
    const found = datasore.findById("10");
    expect(found).not.toBe(null)
    expect(found.serviceId).toBeUndefined
    expect(found.serviceName).toBeUndefined
    expect(found.port).toBeUndefined
    expect(found.host).toBeUndefined
})

test('given a service-instance name, all services can be retrieved.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-2",
        serviceName: "service-name",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(2)
    const found = datasore.findInstancesByName("service-name");
    expect(found.length).toEqual(2);
})

test('given a local id, service can be removed.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-2",
        serviceName: "service-name",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(2)
    const found = datasore.findInstancesByName("service-name");
    expect(found.length).toEqual(2);

    // remove the instance with id 2
    datasore.removeById("2");
    expect(datasore.instances.length).toEqual(1)
    const secondFound = datasore.findInstancesByName("service-name");
    expect(secondFound.length).toEqual(1);
})

test('given a service instance id, service can be removed.', () => {
    const datasore = new DataStore();
    expect(datasore.instances.length).toEqual(0);
    const instance1 = <ServiceInstance>{
        id: "1",
        serviceId: "service-1",
        serviceName: "service-name",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }

    datasore.addInstance(instance1)
    const instance2 = <ServiceInstance>{
        id: "2",
        serviceId: "service-2",
        serviceName: "service-name",
        host: "localhost",
        port: 8080,
        checkIndex: 0
    }
    datasore.addInstance(instance2)
    expect(datasore.instances.length).toEqual(2)
    const found = datasore.findInstancesByName("service-name");
    expect(found.length).toEqual(2);

    // remove the instance with id 2
    datasore.remove("service-2");
    expect(datasore.instances.length).toEqual(1)
    const secondFound = datasore.findInstancesByName("service-name");
    expect(secondFound.length).toEqual(1);
})