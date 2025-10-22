import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { join } from 'path';

ConfigModule.forRoot();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PAS || 'postgres',
  database: process.env.DB_NAME || 'quicknotes',
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  autoLoadEntities: true,
  synchronize: true,
  logging: true,
};

export const AppDataSource = new DataSource(typeOrmConfig as any);
