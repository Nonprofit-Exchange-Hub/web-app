import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConnectionService } from './database-connection.service';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OrganizationsModule } from './organizations/organizations.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
        UsersModule,
        AuthModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '../..', 'client/build'),
        }),
        OrganizationsModule,
    ],
    controllers: [ AppController ],
    providers: []
})
export class AppModule {}
