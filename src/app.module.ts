import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConnectionService } from './database-connection.service';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        TypeOrmModule.forRootAsync({ useClass: DatabaseConnectionService }),
        UsersModule,
        AuthModule
    ],
    controllers: [ AppController ],
    providers: [ AppService ]
})
export class AppModule {}
