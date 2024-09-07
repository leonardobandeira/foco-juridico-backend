import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class IndicadoresService {
  private prisma = new PrismaClient();

  async getIndicadorDetails(indicadorId: number) {
    try {
      const indicador = await this.prisma.indicador.findUnique({
        where: { id: indicadorId },
        include: {
          painel: {
            select: {
              endereco: true,
            },
          },
        },
      });

      if (!indicador) {
        throw new Error('Indicador não localizado');
      }

      return {
        endereco: indicador.painel.endereco,
        chaveDeBusca: indicador.chaveDeBusca,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Erro ao buscar dados do indicador');
    }
  }
}
