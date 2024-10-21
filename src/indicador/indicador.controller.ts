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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Indicador')
@Controller('indicador')
export class IndicadorController {
  constructor(private repo: IndicadorRepository) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo indicador' })
  async criar(@Body() indicador: Indicador) {
    const novoIndicador = await this.repo.criar(indicador);
    return novoIndicador;
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista com todos os indicadores' })
  async obterTodos() {
    const indicador = await this.repo.obterTodos();
    return indicador;
  }

  @Get('/metas')
  @ApiOperation({ summary: 'Retorna uma lista com todos as metas usadas com indicadores' })
  async obterTipoMeta() {
    const tipoMeta = await this.repo.obterTipoMeta();
    return tipoMeta;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um indicador especificado' })
  async atualizar(@Param('id') id: string, @Body() indicador: Indicador) {
    const indicadorAtualizado = await this.repo.atualizar({
      ...indicador,
      id: +id,
    });
    return indicadorAtualizado;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um indicador especificado' })
  async obterPorId(@Param('id') id: string) {
    const indicador = await this.repo.obterPorId(+id);
    return indicador;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um indicador especificado' })
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);
  }
}