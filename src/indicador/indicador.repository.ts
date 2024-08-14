import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import Indicador from './indicador.entity';
import tipoMeta from './tipoMeta.entity';

@Injectable()
export class IndicadorRepository {
  constructor(private prismaService: PrismaService) { }

  async obterTodos() {
    return this.prismaService.indicador.findMany();
  }

  async obterTipoMeta() {
    return this.prismaService.tipoMeta.findMany();
  }

  async obterPorId(id: number) {
    return this.prismaService.indicador.findUnique({
      where: {
        id,
      },
    });
  }

  async criar(indicador: Indicador) {
    return this.prismaService.indicador.create({
      data: indicador as any,
    });
  }

  async atualizar(indicador: Indicador) {
    if (!indicador.id) throw new Error('Painel sem ID');
    return this.prismaService.indicador.update({
      where: {
        id: indicador.id,
      },
      data: indicador as any,
    });
  }

  async deletar(id: number) {
    return this.prismaService.indicador.delete({
      where: {
        id,
      },
    });
  }
}