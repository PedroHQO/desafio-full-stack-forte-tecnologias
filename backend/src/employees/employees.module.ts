import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { EmployeesRepository } from './employees.repository';
import { AssetsRepository } from 'src/assets/assets.repository';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeesRepository, AssetsRepository],
})
export class EmployeesModule {}
