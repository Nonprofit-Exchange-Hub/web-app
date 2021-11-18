import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    OWNER = "owner"
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column('text')
    first_name: string;
  
    @Column('text')
    last_name: string;
  
    @Column({type:'text', unique: true})
    email: string;
  
    @Column('text')
    password: string;

    // move to user_org entity when built
    @Column({type:'enum', enum: UserRole, default: UserRole.ADMIN})
    role: UserRole;
}
