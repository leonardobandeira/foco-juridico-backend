import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import Painel from './painel.entity';
import { PainelRepository } from './painel.repository';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Painel')
@Controller('painel')
export class PainelController {
  constructor(private repo: PainelRepository) { }

  @Post()
  @ApiOperation({ summary: 'Cria um novo painel' })
  async criar(@Body() painel: Painel) {
    const novoPainel = await this.repo.criar(painel);
    return novoPainel;
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista com todos os paineis' })
  async obterTodos() {
    const painel = await this.repo.obterTodos();
    return painel;
  }

  @Get(':id/indicadores')
  @ApiOperation({ summary: 'Retorna uma lista com todos os indicadores anexos ao painel especificado' })
  async obterIndicadores(@Param('id') id: string) {
    const painelId = parseInt(id, 10);
    if (isNaN(painelId)) {
      throw new BadRequestException('ID inválido'); // Adicione tratamento para ID inválido
    }

    const indicadores = await this.repo.obterIndicadores(painelId);
    return indicadores;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um painel especificado' })
  async atualizar(@Param('id') id: string, @Body() painel: Painel) {
    const painelAtualizado = await this.repo.atualizar({
      ...painel,
      id: +id,
    });
    return painelAtualizado;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um painel especificado' })
  async obterPorId(@Param('id') id: string) {
    const painel = await this.repo.obterPorId(+id);
    return painel;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um painel especificado' })
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);
  }
}