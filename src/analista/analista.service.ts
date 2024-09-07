import { Injectable } from '@nestjs/common';
import { Alerta } from '@prisma/client';

@Injectable()
export class AnalistaService {
  analisar(alerta: Alerta) {
    console.log('Analisando pagina... para o alerta => ' + alerta.nome)
  }
}
