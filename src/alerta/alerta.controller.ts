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

@Controller('alerta')
export class AlertaController {
  constructor(private repo: AlertaRepository) { }

  @Post()
  async criar(@Body() alerta: Alerta) {
    const novoAlerta = await this.repo.criar(alerta);
    return novoAlerta;
  }

  @Get()
  async obterTodos() {
    const alertas = await this.repo.obterTodos();
    return alertas;
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() alerta: Alerta) {
    const alertaAtualizado = await this.repo.atualizar({
      ...alerta,
      id: +id,
    });
    return alertaAtualizado;
  }

  @Get(':id')
  async obterPorId(@Param('id') id: string) {
    const alerta = await this.repo.obterPorId(+id);
    return alerta;
  }

  @Delete(':id')
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);
  }
}