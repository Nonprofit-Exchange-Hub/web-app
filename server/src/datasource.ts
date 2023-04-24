import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConnectionService } from './database-connection.service';

const service = new DatabaseConnectionService();
const datasource = new DataSource(service.createTypeOrmOptions() as DataSourceOptions);
datasource.initialize();
export default datasource;
