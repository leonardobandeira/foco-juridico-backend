import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AgendadorService } from './agendador.service';

@Controller('agendador')
export class AgendadorController {
  constructor(private readonly agendadorService: AgendadorService) { }

  @Get('')
  findAll() {
    return this.agendadorService.agenda();
  }

  @Delete('agenda:id')
  remove(@Param('id') id: string) {
  }
}
