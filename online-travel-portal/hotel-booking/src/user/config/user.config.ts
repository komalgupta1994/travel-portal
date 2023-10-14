import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const userConfig: TypeOrmModuleOptions = {
  name: 'user',
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: +process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'Komal@123',
  database: process.env.USER_DB || 'user_management',
  entities: [],
  synchronize: false,
  autoLoadEntities: true,
  retryAttempts: 3,
};
