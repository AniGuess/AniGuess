import { HomeTest } from '../src/modules/home/tests/HomeResolver.test';
import { testDataSource } from '../src/utils/createDataSource';

beforeAll(async () => {
  await testDataSource();
});

afterAll(async () => {
  await testDataSource(true);
});

describe('Home', HomeTest);
