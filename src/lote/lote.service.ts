import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lote } from './lote.entity';
import { CreateLote } from './dto/create-lote.dto';
import * as turf from '@turf/turf';

@Injectable()
export class LoteService {
  constructor(
    @InjectRepository(Lote)
    private loteRepository: Repository<Lote>,
  ) {}

  async create(createLoteDto: CreateLote): Promise<Lote> {
    const lote = new Lote();
    lote.nombre = createLoteDto.nombre;
    lote.coordenadas = createLoteDto.coordenadas;
    lote.area = this.calculateArea(createLoteDto.coordenadas);
    return this.loteRepository.save(lote);
  }

  async findAll(): Promise<Lote[]> {
    return this.loteRepository.find();
  }

  async findOne(id: number): Promise<Lote> {
    const lote = await this.loteRepository.findOne({ where: { id } });
    if (!lote) {
      throw new NotFoundException(`Lote con ID ${id} no encontrado.`);
    }
    return lote;
  }

  async update(id: number, updateLoteDto: CreateLote): Promise<Lote> {
    const lote = await this.loteRepository.findOne({ where: { id } });
    if (!lote) {
      throw new NotFoundException(`Lote con ID ${id} no encontrado.`);
    }

    lote.nombre = updateLoteDto.nombre;
    lote.coordenadas = updateLoteDto.coordenadas;
    lote.area = this.calculateArea(updateLoteDto.coordenadas);
    return this.loteRepository.save(lote);
  }

  async remove(id: number): Promise<void> {
    const lote = await this.loteRepository.findOne({ where: { id } });
    if (!lote) {
      throw new NotFoundException(`Lote con ID ${id} no encontrado.`);
    }

    await this.loteRepository.remove(lote);
  }

  private calculateArea(coordenadas: any): number {
    if (!Array.isArray(coordenadas) || coordenadas.length < 3) {
      throw new Error('Las coordenadas proporcionadas no forman un polígono válido.');
    }

    const polygon = turf.polygon([coordenadas]);
    return turf.area(polygon);
  }
}
