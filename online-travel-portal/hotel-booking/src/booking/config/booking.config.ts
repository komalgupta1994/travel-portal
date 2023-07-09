import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const bookingConfig: TypeOrmModuleOptions = {
    // name: 'hotelBooking',
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.HOTEL_DB,
    entities: [],
    // synchronize: true,
    autoLoadEntities: true,
    retryAttempts: 3
};
