import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesModule } from './medicines/medicines.module';
import { PatientsModule } from './patients/patients.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      database: 'postgres',
      username: 'postgres',
      password: 'admin',
      port: 5432,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PatientsModule,
    MedicinesModule,
    RecipesModule,
  ],
})

export class AppModule {}

