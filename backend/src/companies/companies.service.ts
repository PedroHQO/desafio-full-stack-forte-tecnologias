import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompaniesRepository } from './companies.repository';
import { CompanyResponseDto } from './dto/company.response.dto';
import { CompanyMapper } from './mappers/company.mapper';
import { EmployeesRepository } from 'src/employees/employees.repository';
import { EmployeeMapper } from 'src/employees/mappers/employee.mapper';
import { AssetsRepository } from 'src/assets/assets.repository';
import { AssetMapper } from 'src/assets/mappers/asset.mapper';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly repository: CompaniesRepository,
    private readonly employeeRepository: EmployeesRepository,
    private readonly assetRepository: AssetsRepository,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
  ): Promise<CompanyResponseDto> {
    const companyEntity = await this.repository.create(createCompanyDto);
    return CompanyMapper.toResponse(companyEntity);
  }

  async findAll(): Promise<CompanyResponseDto[]> {
    const companies = await this.repository.findAll();
    return CompanyMapper.toResponseArray(companies);
  }

  async findAllEmployeesByCompany(companyId: string){
    const employees = await this.employeeRepository.findAllByCompany(companyId);
    return EmployeeMapper.toResponseArray(employees as any);
  }

  async findOne(id: string): Promise<CompanyResponseDto> {
    const companyEntity = await this.repository.findOne(id);

    if (!companyEntity) {
      throw new NotFoundException(`Company whith ID "${id}" not found`);
    }
    return CompanyMapper.toResponse(companyEntity);
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyResponseDto> {
    await this.findOne(id);
    const updatedCompany = await this.repository.update(id, updateCompanyDto);
    return CompanyMapper.toResponse(updatedCompany);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.remove(id);
  }
}
