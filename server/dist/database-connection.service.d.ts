import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
export declare class DatabaseConnectionService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions;
}
