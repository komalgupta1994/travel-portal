import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const userConfig: TypeOrmModuleOptions = {
    name: 'user',
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.USER_DB,
    entities: [],
    synchronize: false,
    autoLoadEntities: true,
    retryAttempts: 3
};
