import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompaniesRepository } from './companies.repository';
import { EmployeesRepository } from 'src/employees/employees.repository';
import { AssetsRepository } from 'src/assets/assets.repository';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository, EmployeesRepository, AssetsRepository],
})
export class CompaniesModule {}
