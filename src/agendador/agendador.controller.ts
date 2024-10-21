import { Controller, Get, Param, Delete } from '@nestjs/common';
import { AgendadorService } from './agendador.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Agendador')
@Controller('agendador')
export class AgendadorController {
  constructor(private readonly agendadorService: AgendadorService) { }

  @Get('')
  @ApiOperation({ summary: 'Retorna uma lista com todos os agendamentos' })
  findAll() {
    return this.agendadorService.agenda();
  }

  @Delete('agenda:id')
  @ApiOperation({ summary: 'Remove um agendamento' })
  remove(@Param('id') id: string) {
  }
}
