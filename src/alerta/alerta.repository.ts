import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { Alerta } from './alerta.entity';

@Injectable()
export class AlertaRepository {
  constructor(private prismaService: PrismaService) { }

  async obterTodos() {
    return this.prismaService.alerta.findMany();
  }

  async obterPorId(id: number) {
    return this.prismaService.alerta.findUnique({
      where: {
        id,
      },
    });
  }

  async criar(alerta: Alerta) {
  return this.prismaService.alerta.create({
    data: {
      nome: alerta.nome,
      frequencia: alerta.frequencia,
      valor: alerta.valor,  
      usuario: {
        connect: { id: alerta.usuarioId }
      },
      indicador: {
        connect: { id: alerta.indicadorId }
      },
      tipoMeta: {
        connect: { id: alerta.tipoMetaId }
      },
    },
  });
}



  async atualizar(alerta: Alerta) {
    if (!alerta.id) throw new Error('Alerta sem ID');
    return this.prismaService.alerta.update({
      where: {
        id: alerta.id,
      },
      data: alerta as any,
    });
  }

  async deletar(id: number) {
    return this.prismaService.alerta.delete({
      where: {
        id,
      },
    });
  }
}