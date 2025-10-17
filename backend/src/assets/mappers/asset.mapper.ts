import { EmployeeMapper } from 'src/employees/mappers/employee.mapper';
import { AssetResponseDto } from '../dto/asset.response.dto';
import { Asset, Employee } from '@prisma/client';

type AssetWithEmployee = Asset & { employee: Employee | null };

export class AssetMapper {
  public static toResponse(entity: AssetWithEmployee): AssetResponseDto {
    const responseDto = new AssetResponseDto();
    responseDto.id = entity.id;
    responseDto.name = entity.name;
    responseDto.type = entity.type;
    responseDto.status = entity.status;
    responseDto.createdAt = entity.createdAt;
    responseDto.updatedAt = entity.updatedAt;

    responseDto.employee = entity.employee
    ? EmployeeMapper.toResponse(entity.employee)
    : null;

    return responseDto;
  }

  public static toResponseArray(entities: AssetWithEmployee[]): AssetResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
