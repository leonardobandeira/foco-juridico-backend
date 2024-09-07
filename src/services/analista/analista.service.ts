import { Injectable, Logger } from '@nestjs/common';
import { Alerta } from '@prisma/client';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { AgendadorService } from 'src/agendador/agendador.service';
import { IndicadoresService } from '../indicadores/indicadores.service';

@Injectable()
export class AnalistaService {
  constructor(private readonly indicadoresService: IndicadoresService) { }

  private readonly logger = new Logger(AgendadorService.name);
  analisar(alerta: Alerta) {
    console.log('Analisando pagina... para o alerta => ' + alerta.nome)
    const data = this.indicadoresService.getIndicadorDetails(alerta.indicadorId);
    data.then(resp => {
      console.log("Dados da busca do indicador", resp);
    })
  }

  async scrapeWeb(url: string, chave: string): Promise<any> {
    try {
      const { data: html } = await axios.get(url);

      const $ = cheerio.load(html);

      const valor_indicador = [];
      $(chave).each((index, element) => {
        valor_indicador.push($(element).text());
      });

      return valor_indicador;
    } catch (error) {
      throw error;
    }
  }
}
