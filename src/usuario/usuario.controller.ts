import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import Usuario from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('Gerencia de usuários')
@Controller('usuario')
export class UsuarioController {
  constructor(private repo: UsuarioRepository) {}

  @Post()
  @ApiOperation({ summary: 'Cria um usuário' })
  async criar(@Body() usuario: Usuario) {
    const novoUsuario = await this.repo.criar(usuario);
    return novoUsuario;
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista com todos os usuários' })
  async obterTodos() {
    const usuarios = await this.repo.obterTodos();
    return usuarios;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Altera um usuário especificado' })
  async atualizar(@Param('id') id: string, @Body() usuario: Usuario) {
    const usuarioAtualizado = await this.repo.atualizar({
      ...usuario,
      id: +id,
    });
    return usuarioAtualizado;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um usuário especificado' })
  async obterPorId(@Param('id') id: string) {
    const usuario = await this.repo.obterPorId(+id);
    return usuario;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um usuário especificado' })
  async deletar(@Param('id') id: string) {
    await this.repo.deletar(+id);
  }
}