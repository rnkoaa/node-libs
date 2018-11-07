import { RandomStrategy } from './random-strategy';
import { RoundRobinStrategy } from './round-robin-strategy';

export class DiscoveryStrategyFactory {
  createStrategy(type: 'random'): RandomStrategy;
  createStrategy(type: 'round-robin'): RoundRobinStrategy;

  public createStrategy(strategy: string): RandomStrategy | RoundRobinStrategy {
    if (strategy === 'random') {
      return new RandomStrategy();
    } else if (strategy === 'round-robin') {
      return new RoundRobinStrategy();
    } else {
      throw new Error('Select either a Hero or a Villain');
    }
  }
}
