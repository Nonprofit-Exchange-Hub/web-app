import { Transaction } from '../../transactions/entities/transaction.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { RoomStatus } from '../room-status-enum';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.NEW_CLAIM,
  })
  status: RoomStatus;

  @OneToOne(() => Transaction, (t) => t.room)
  @JoinColumn()
  transaction: Transaction;
}
