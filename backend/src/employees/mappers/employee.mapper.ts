import { Employee } from '@prisma/client';
import { EmployeeResponseDto } from '../dto/employee.response.dto';

export class EmployeeMapper {
  public static toResponse(entity: Employee): EmployeeResponseDto {
    const responseDto = new EmployeeResponseDto();
    responseDto.id = entity.id;
    responseDto.name = entity.name;
    responseDto.cpf = entity.cpf;
    responseDto.email = entity.email;
    responseDto.companyId = entity.companyId;
    responseDto.createdAt = entity.createdAt;
    responseDto.updatedAt = entity.updatedAt;
    return responseDto;
  }

  public static toResponseArray(entities: Employee[]): EmployeeResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
