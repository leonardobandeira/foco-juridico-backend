import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AlertaRepository } from './alerta.repository';
import { Alerta } from './alerta.entity';
import { Injectable } from '@nestjs/common';
import { AgendadorService } from 'src/agendador/agendador.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Alerta')
@Injectable()
@Controller('alerta')
export class AlertaController {
  constructor(
    private repo: AlertaRepository,
    private agendadorService: AgendadorService
  ) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo alerta' })
  async criar(@Body() alerta: Alerta) {
    const novoAlerta = await this.repo.criar(alerta);
    this.agendarProcessoAlerta(novoAlerta);
    return novoAlerta;
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista com todos os alertas' })
  async obterTodos() {
    const alertas = await this.repo.obterTodos();
    return alertas;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Altera um alerta especificado' })
  async atualizar(@Param('id') id: string, @Body() alerta: Alerta) {
    const alertaAtualizado = await this.repo.atualizar({
      ...alerta,
      id: +id,
    });
    return alertaAtualizado;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um alerta especificado' })
  async obterPorId(@Param('id') id: string) {
    const alerta = await this.repo.obterPorId(+id);
    return alerta;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove o alerta especificado' })
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);

    this.cancelarProcessoAgendado(id);
  }

  private agendarProcessoAlerta(alerta: Alerta) {
    this.agendadorService.agendar(alerta);
  }

  private cancelarProcessoAgendado(nome: string) {
    console.log("Cancelando um alerta => ", nome);
  }
}
