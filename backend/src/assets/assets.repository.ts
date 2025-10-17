import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { CreateAssetDto } from './dto/create-asset.dto';

@Injectable()
export class AssetsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(createAssetDto: CreateAssetDto) {
    return this.prisma.asset.create({
      data: {
        ...createAssetDto,
        status: 'Disponível',
      },
      include: {
        employee: true,
      },
    });
  }

  findAll() {
    return this.prisma.asset.findMany({
      include: {
        employee: true,
      },
    });
  }

  findAllByEmployee(employeeId: string) {
    return this.prisma.asset.findMany({
      where: { employeeId },
    });
  }

  findOne(id: string) {
    return this.prisma.asset.findUnique({
      where: { id },
      include: {
        employee: true,
      },
    });
  }

  findNotebookByEmployee(employeeId: string) {
    return this.prisma.asset.findFirst({
      where: {
        employeeId,
        type: 'Notebook',
      },
    });
  }

  associate(assetId: string, employeeId: string) {
    return this.prisma.asset.update({
      where: { id: assetId },
      data: {
        employeeId: employeeId,
        status: 'Em Uso',
      },
      include: { employee: true },
    });
  }

  desassociate(assetId: string) {
  return this.prisma.asset.update({
    where: { id: assetId },
    data: {
      employeeId: null,
      status: 'Disponível',
    },
    include: { employee: true },
  });
}

  update(id: string, updateAssetDto: UpdateAssetDto) {
    return this.prisma.asset.update({
      where: { id },
      data: updateAssetDto,
      include: {
        employee: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
