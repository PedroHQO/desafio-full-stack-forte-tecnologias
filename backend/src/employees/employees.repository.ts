import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EmployeesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({
      data: createEmployeeDto,
    });
  }

  findOne(id: string) {
    return this.prisma.employee.findUnique({
      where: { id },
      include: { company: true },
    });
  }

  findAll() {
    return this.prisma.employee.findMany();
  }

  findAllByCompany(companyId: string){
    return this.prisma.employee.findMany({
      where: { companyId },
    });
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  remove(id: string) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
