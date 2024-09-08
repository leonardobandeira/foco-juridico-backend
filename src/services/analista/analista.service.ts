import { Injectable, Logger } from '@nestjs/common';
import { Alerta } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { IndicadoresService } from '../indicadores/indicadores.service';
import { comparisonOperators } from './operadores';
import { EmailService } from '../email/email.service';

@Injectable()
export class AnalistaService {
  constructor(private readonly indicadoresService: IndicadoresService, private readonly emailService: EmailService,) { }
  private readonly logger = new Logger(AnalistaService.name);

  async analisar(alerta: Alerta) {
    try {
      const resp = await this.indicadoresService.getIndicadorDetails(alerta.indicadorId);
      const scrapeResult = await this.scrapeWeb(resp.endereco, resp.chaveDeBusca);
      this.logger.log('Alerta ('+alerta.nome+') dispara quando (valor atual) ' + scrapeResult + ' for ' + comparisonOperators[alerta.tipoMetaId] + ' que ' + alerta.valor)

      if (verificarAlerta(scrapeResult, alerta.valor, alerta.tipoMetaId)) {
        const msg = `O seguinte alerta foi acionado: ${alerta.nome}, seu valor atualmente é ${scrapeResult}.`

        const email = 'focojuridico.tcc@gmail.com'
        this.emailService.alertar(email, `[Alerta]${alerta.nome}`, msg);
        console.log("Cancelar agendamento?")
      }
    } catch (error) {
      console.error("Erro ao analisar o alerta", error);
    }
  }

  async scrapeWeb(url: string, chave: string): Promise<any> {
    try {
      const { data: html } = await axios.get(url);

      const $ = cheerio.load(html);

      const valor_indicador = [];
      $(`#${chave}`).each((index, element) => {
        valor_indicador.push($(element).text());
      });

      return valor_indicador[0];
    } catch (error) {
      throw error;
    }
  }
}

function verificarAlerta(valor1: number, valor2: number, idMeta: number): boolean {
  const operator = comparisonOperators[idMeta];
  if (!operator) {
    throw new Error(`Operador de comparação não encontrado para idMeta ${idMeta}`);
  }

  switch (operator) {
    case '<':
      return valor1 < valor2;
    case '<=':
      return valor1 <= valor2;
    case '=':
      return valor1 === valor2;
    case '>':
      return valor1 > valor2;
    case '>=':
      return valor1 >= valor2;
    case '!=':
      return valor1 !== valor2;
    default:
      throw new Error(`Operador de comparação inválido: ${operator}`);
  }
}

