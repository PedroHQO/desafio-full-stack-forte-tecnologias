import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee.response.dto';
import { EmployeeMapper } from './mappers/employee.mapper';
import { EmployeesRepository } from './employees.repository';
import { AssetsRepository } from 'src/assets/assets.repository';
import { AssetMapper } from 'src/assets/mappers/asset.mapper';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly repository: EmployeesRepository,
    private readonly assetRepository: AssetsRepository,
  ) {}

  async create(
    createEmployeeDto: CreateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    const employeeEntity = await this.repository.create(createEmployeeDto);
    return EmployeeMapper.toResponse(employeeEntity);
  }

  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.repository.findAll();
    return EmployeeMapper.toResponseArray(employees);
  }

  async findAllAssetsByEmployee(employeeId: string){
      const assets = await this.assetRepository.findAllByEmployee(employeeId);
      return AssetMapper.toResponseArray(assets as any);
    }

  async findOne(id: string): Promise<EmployeeResponseDto> {
    const employeeEntity = await this.repository.findOne(id);

    if (!employeeEntity) {
      throw new NotFoundException(`Employee with ID "${id}" not found`);
    }
    return EmployeeMapper.toResponse(employeeEntity);
  }

  async update(
    id: string,
    updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    await this.findOne(id);
    const updatedEmployee = await this.repository.update(id, updateEmployeeDto);
    return EmployeeMapper.toResponse(updatedEmployee);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.remove(id);
  }
}
