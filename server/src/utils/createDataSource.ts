import { DataSource } from 'typeorm';
import { entities } from '../db/index.js';

export const createAppDataSource = () => {
  return new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: entities,
    migrations: [
      `./${process.env.NODE_ENV === 'production' ? 'dist' : 'src'}/db/migrations/*.{ts,js}`
    ],
    synchronize: false,
    logging: process.env.NODE_ENV === 'production' ? false : true
  });
};

let dataSource: DataSource | undefined;

export const testDataSource = async (destroy?: boolean): Promise<DataSource> => {
  if (destroy && !!dataSource) {
    await dataSource.destroy();
    return dataSource;
  }
  if (dataSource) {
    return dataSource;
  }
  dataSource = new DataSource({
    name: 'default',
    type: 'sqlite',
    database: 'aniguess',
    synchronize: true,
    dropSchema: true,
    entities: entities
  });
  await dataSource.initialize();
  return dataSource;
};
