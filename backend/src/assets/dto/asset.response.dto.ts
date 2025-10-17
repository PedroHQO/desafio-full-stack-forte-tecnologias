import { EmployeeResponseDto } from 'src/employees/dto/employee.response.dto';

export class AssetResponseDto {
  id: string;
  name: string;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  employee: EmployeeResponseDto | null;
}
