import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('assets')
export class Asset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  descripton: string;

  // @Column('text')
  // type: string;

  // @Column('text')
  // image_url: string;

  // @Column('text')
  // address: string;

  @ManyToOne(() => User, (user) => user.assets)
  poster_id: User;
}
