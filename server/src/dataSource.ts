import 'dotenv/config';
import { createAppDataSource } from './utils/createDataSource.js';

export const dataSource = createAppDataSource();
