import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../acccount-manager/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';
import { IsOptional } from 'class-validator';
import { Message } from 'src/messages/entities/message.entity';

@Entity('receivedmessages')
export class Receivedmessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_date: Date;

  @ManyToMany(() => User, (user) => user.receivedMessages)
  @JoinColumn()
  sending_user: User;

  @ManyToOne(() => Message, (message) => message.readReceipts, { eager: true })
  @JoinColumn()
  message: Message;

  @Column({ nullable: true })
  messageId: number;

  @Column({ nullable: true })
  sendingUserId: number;

  @Column('boolean')
  seen: boolean;
}
