import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { LoteService } from './lote.service';
import { CreateLote } from './dto/create-lote.dto';
import { UpdateLote } from './dto/update-lote.dto';

@Controller('lotes')
export class LoteController {
  constructor(private readonly loteService: LoteService) {}

  @Post()
  create(@Body() createLoteDto: CreateLote) {
    return this.loteService.create(createLoteDto);
  }

  @Get()
  findAll() {
    return this.loteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.loteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateLoteDto: UpdateLote) {
    return this.loteService.update(id, updateLoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.loteService.remove(id);
  }
}
