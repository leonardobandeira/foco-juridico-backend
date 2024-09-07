import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Alerta } from '@prisma/client';
import { CronJob } from 'cron';
import { AnalistaService } from 'src/analista/analista.service';

@Injectable()
export class AgendadorService {
  constructor(private schedulerRegistry: SchedulerRegistry,
  private analista:AnalistaService) { }
  private readonly logger = new Logger(AgendadorService.name);

  agendar(alerta:Alerta) {
    const interval = Math.floor(60 / alerta.frequencia);

    const job = new CronJob(`*/${interval} * * * * *`, () => {
      this.logger.warn(`Execultando alerta => ${alerta.nome}`);
      this.analista.analisar(alerta)
    });

    this.schedulerRegistry.addCronJob(alerta.nome, job);
    job.start();
  }

  agenda() {
    const eventos = this.schedulerRegistry.getCronJobs();
    let retorno = '';
    eventos.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDate().toJSDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
      retorno += `Alerta = ${key} - next: ${next};`;
    });

    return retorno
  }

  cancelar(nome: string) {
    this.schedulerRegistry.deleteCronJob(nome);
    this.logger.warn(`Alerta cancelado => ${nome}!`)
  }
}
