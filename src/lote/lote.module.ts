import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoteService } from './lote.service';
import { LoteController } from './lote.controller';
import { Lote } from './lote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lote])],
  providers: [LoteService],
  controllers: [LoteController],
})
export class LoteModule {}
