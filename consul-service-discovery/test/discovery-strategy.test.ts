import { DiscoveryStrategyFactory } from '../lib/discovery-strategy-factory';
import { DataStore } from '../lib/data-store';
const discoveryStrategyFactory = new DiscoveryStrategyFactory();
const dataStore: DataStore = new DataStore();

test('Random discovery service can be created', () => {
  expect(discoveryStrategyFactory.createStrategy('random').select(dataStore)).toBe('random');
});

test('Round robin discovery service can be created', () => {
  dataStore.addInstance('round-robin');
  dataStore.addInstance('round-robin-2');
  const strategy = discoveryStrategyFactory.createStrategy('round-robin');
  expect(strategy.select(dataStore)).toBe('round-robin-2');
  expect(strategy.select(dataStore)).toBe('round-robin');
  expect(strategy.select(dataStore)).toBe('round-robin-2');
});
