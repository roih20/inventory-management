import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { EmployeeModule } from './employee/employee.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: configService.get('PGPORT') || 5432,
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        database: configService.get('PGDATABASE'),
        ssl: configService.get('PGSSLMODE') === 'require',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          ttl: 60000,
          limit: 10,
        },
        {
          name: 'auth',
          ttl: 60000,
          limit: 5,
        },
      ],
    }),
    AuthModule,
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
