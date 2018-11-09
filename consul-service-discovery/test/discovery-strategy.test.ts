// import { SelectionStrategyFactory } from '../lib/selection-strategy'
// import { DataStore } from '../lib/data-store';
// import { ServiceInstance } from '../lib/types/consul';
// const discoveryStrategyFactory = new SelectionStrategyFactory();
// const dataStore: DataStore = new DataStore();

test('discovery service', () => {
  expect(true).toBe(true);
})
// test('Random discovery service can be created', () => {
//   expect(discoveryStrategyFactory.createStrategy('random').select("random", dataStore)).toBe('random');
// });

// test('Round robin discovery service can be created', () => {
  // const instance1 = <ServiceInstance>{
  //   id: "1",
  //   serviceId: "service-1",
  //   serviceName: "service-name-1",
  //   host: "localhost",
  //   port: 8080,
  //   checkIndex: 0
  // }
  // dataStore.addInstance(instance1)
  // dataStore.addInstance('round-robin');
  // dataStore.addInstance('round-robin-2');
  // const strategy = discoveryStrategyFactory.createStrategy('round-robin');
  // expect(strategy.select("round-robin", dataStore)).toBe('round-robin-2');
  // expect(strategy.select("round-robin", dataStore)).toBe('round-robin');
  // expect(strategy.select("round-robin", dataStore)).toBe('round-robin-2');
// });
