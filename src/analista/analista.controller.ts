import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnalistaService } from './analista.service';

@Controller('analista')
export class AnalistaController {
  constructor(private readonly analistaService: AnalistaService) {}
}
