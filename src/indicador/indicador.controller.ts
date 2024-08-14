import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import Indicador from './indicador.entity';
import { IndicadorRepository } from './indicador.repository';

@Controller('indicador')
export class IndicadorController {
  constructor(private repo: IndicadorRepository) { }

  @Post()
  async criar(@Body() indicador: Indicador) {
    const novoIndicador = await this.repo.criar(indicador);
    return novoIndicador;
  }

  @Get()
  async obterTodos() {
    const indicador = await this.repo.obterTodos();
    return indicador;
  }

  @Get('/metas')
  async obterTipoMeta() {
    const tipoMeta = await this.repo.obterTipoMeta();
    return tipoMeta;
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() indicador: Indicador) {
    const indicadorAtualizado = await this.repo.atualizar({
      ...indicador,
      id: +id,
    });
    return indicadorAtualizado;
  }

  @Get(':id')
  async obterPorId(@Param('id') id: string) {
    const indicador = await this.repo.obterPorId(+id);
    return indicador;
  }

  @Delete(':id')
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);
  }
}