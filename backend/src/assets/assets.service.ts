import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { AssetResponseDto } from './dto/asset.response.dto';
import { AssetMapper } from './mappers/asset.mapper';
import { AssetsRepository } from './assets.repository';
import { EmployeesRepository } from 'src/employees/employees.repository';

@Injectable()
export class AssetsService {
  constructor(
    private readonly repository: AssetsRepository,
    private readonly employeeRepository: EmployeesRepository,
  ) {}

  async create(createAssetDto: CreateAssetDto): Promise<AssetResponseDto> {
    const assetEntity = await this.repository.create(createAssetDto);
    return AssetMapper.toResponse(assetEntity);
  }

  async findAll(): Promise<AssetResponseDto[]> {
    const assets = await this.repository.findAll();
    return AssetMapper.toResponseArray(assets);
  }

  async findOne(id: string): Promise<AssetResponseDto> {
    const assetEntity = await this.repository.findOne(id);

    if (!assetEntity) {
      throw new NotFoundException(`Asset whith ID "${id}" not found`);
    }
    return AssetMapper.toResponse(assetEntity as any);
  }

  async update(
    id: string,
    updateAssetDto: UpdateAssetDto,
  ): Promise<AssetResponseDto> {
    await this.findOne(id);
    const updatedAsset = await this.repository.update(id, updateAssetDto);
    return AssetMapper.toResponse(updatedAsset);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repository.remove(id);
  }

  async associateAsset(assetId: string, employeeId: string) {
    const [asset, employee] = await Promise.all([
      this.repository.findOne(assetId),
      this.employeeRepository.findOne(employeeId),
    ]);

    if (!asset) {
      throw new NotFoundException(`Asset with ID "${assetId}" not found`);
    }
    if (!employee) {
      throw new NotFoundException(`Employee with ID "${employeeId}" not found`);
    }

    if (asset.status !== 'Disponível') {
      throw new ConflictException(`Asset is not 'Disponível'`);
    }

    if (asset.type === 'Notebook') {
      const existingNotebook =
        await this.repository.findNotebookByEmployee(employeeId);
      if (existingNotebook) {
        throw new ConflictException(
          `Employee already has a 'Notebook' associated.`,
        );
      }
    }

    const associatedAsset = await this.repository.associate(
      assetId,
      employeeId,
    );
    return AssetMapper.toResponse(associatedAsset as any);
  }

  async desassociateAsset(assetId: string) {
  const asset = await this.repository.findOne(assetId);

    if (!asset) {
      throw new NotFoundException(`Asset with ID "${assetId}" not found`);
    }

    if (asset.status === 'Disponível') {
      throw new ConflictException(`Asset is already 'Disponível'`);
    }

    const desassociatedAsset = await this.repository.desassociate(assetId);
    return AssetMapper.toResponse(desassociatedAsset as any);
  }
}
