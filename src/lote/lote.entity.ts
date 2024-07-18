import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  area: number;

  @Column('json')
  coordenadas: any;
}