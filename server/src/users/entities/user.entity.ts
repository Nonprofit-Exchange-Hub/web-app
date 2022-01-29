import { UserOrganization } from '../../user-org/entities/user-org.entitiy';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import { Asset } from '../../assets/entities/asset.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Asset, (asset) => asset.poster)
  assets: Asset[];

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @OneToMany(() => UserOrganization, (user_org) => user_org.user)
  user_organizations: UserOrganization[];
}
