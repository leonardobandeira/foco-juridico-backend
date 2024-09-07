import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class AgendadorService {
  constructor(private schedulerRegistry: SchedulerRegistry) { }
  private readonly logger = new Logger(AgendadorService.name);

  agendar(name: string, frequencia: number) {
    const interval = Math.floor(60 / frequencia);

    const job = new CronJob(`*/${interval} * * * * *`, () => {
      this.logger.warn(`Execultando alerta => ${name}`);
    });

    this.schedulerRegistry.addCronJob(name, job);
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
