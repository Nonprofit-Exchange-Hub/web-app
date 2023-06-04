import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  @Index()
  name: string;

  @Column('boolean')
  applies_to_assets: boolean;

  @Column('boolean')
  applies_to_organizations: boolean;
}
