import { Company } from '@prisma/client';
import { CompanyResponseDto } from '../dto/company.response.dto';

export class CompanyMapper {
  public static toResponse(entity: Company): CompanyResponseDto {
    const responseDto = new CompanyResponseDto();
    responseDto.id = entity.id;
    responseDto.name = entity.name;
    responseDto.cnpj = entity.cnpj;
    responseDto.createdAt = entity.createdAt;
    responseDto.updatedAt = entity.updatedAt;
    return responseDto;
  }

  public static toResponseArray(entities: Company[]): CompanyResponseDto[] {
    return entities.map((entity) => this.toResponse(entity));
  }
}
