import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import Painel from './painel.entity';
import { Indicador } from '@prisma/client';

@Injectable()
export class PainelRepository {
  constructor(private prismaService: PrismaService) { }

  async obterTodos() {
    return this.prismaService.painel.findMany();
  }

  async obterIndicadores(painelId: number): Promise<Indicador[]> {
    const indicadores = await this.prismaService.indicador.findMany({
      where: {
        painelId: painelId
      }
    });

    return indicadores;
  }

  async obterPorId(id: number) {
    return this.prismaService.painel.findUnique({
      where: {
        id,
      },
    });
  }

  async criar(painel: Painel) {
    return this.prismaService.painel.create({
      data: painel as any,
    });
  }

  async atualizar(painel: Painel) {
    if (!painel.id) throw new Error('Painel sem ID');
    return this.prismaService.painel.update({
      where: {
        id: painel.id,
      },
      data: painel as any,
    });
  }

  async deletar(id: number) {
    return this.prismaService.painel.delete({
      where: {
        id,
      },
    });
  }
}
