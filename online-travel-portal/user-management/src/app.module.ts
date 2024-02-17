import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import {
  PrometheusModule,
  makeCounterProvider,
} from '@willsoto/nestjs-prometheus';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserResolver } from './app.resolver';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { rabbitMQConfig } from './config/rabbitmq.config';

@Module({
  imports: [
    RabbitMQModule.forRoot(rabbitMQConfig),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST || 'localhost',
      port: +process.env.MYSQL_PORT || 3306,
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || 'Komal@123',
      database: process.env.USER_DB || 'user_management',
      entities: [],
      autoLoadEntities: true,
      retryAttempts: 3,
    }),
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY || 'SECRET KEY',
      signOptions: { expiresIn: '1h' },
    }),
    PrometheusModule.register({
      defaultLabels: {
        app: 'User Management',
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      path: '/user/graphql',
    }),
  ],
  controllers: [AppController],
  providers: [
    UserResolver,
    AppService,
    makeCounterProvider({
      name: 'user_metric',
      help: 'user_metric_help',
    }),
  ],
  exports: [AppService],
})
export class AppModule {}
