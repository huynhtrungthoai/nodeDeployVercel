import { DataSource } from 'typeorm';

import { User } from './models/user';

export const AppDataSource = new DataSource({
    type: 'postgres',
    url: 'postgres://default:R3mLQfI2FVwl@ep-tiny-water-a1dq6tvz.ap-southeast-1.aws.neon.tech:5432/verceldb?sslmode=require',
    entities: [User],
    synchronize: true,
    logging: false,
    // entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
