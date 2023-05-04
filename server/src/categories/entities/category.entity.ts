import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('categories')
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('text')
  @Index()
  name: string;

  @ApiProperty()
  @Column('boolean')
  applies_to_assets: boolean;

  @ApiProperty()
  @Column('boolean')
  applies_to_organizations: boolean;
}
