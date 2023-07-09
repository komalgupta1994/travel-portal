import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PrometheusModule, makeCounterProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.USER_DB,
    entities: [],
    autoLoadEntities: true,
    retryAttempts: 3
  }),
  TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  }),
  PrometheusModule.register(
    {
      defaultLabels: {
        app: "User Management",
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService, makeCounterProvider({
    name: "user_metric",
    help: "user_metric_help",
  }),],
  exports: [AppService]
})
export class AppModule { }
