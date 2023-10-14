import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const bookingConfig: TypeOrmModuleOptions = {
  // name: 'hotelBooking',
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: +process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'Komal@123',
  database: process.env.HOTEL_DB || 'hotel_management',
  entities: [],
  // synchronize: true,
  autoLoadEntities: true,
  retryAttempts: 3,
};
