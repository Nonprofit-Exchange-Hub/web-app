import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

export enum Role {
    admin = 'ADMIN',
    owner = 'OWNER',
    revoked = 'REVOKED'
}

export enum ApprovalStatus {
    approved = 'APPROVED',
    pending = 'PENDING',
    denied = 'DENIED'
}

@Entity('userOrganizations')
export class UserOrganization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    user_id!: number;

    @Column('int')
    org_id!: number;

    @Column({
        type: "enum",
        enum: ApprovalStatus,
        default: ApprovalStatus.pending
    })
    approvalStatus: ApprovalStatus;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.admin
    })
    role: Role;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Organization, user => user)// added a one to many relationship in org and user files
    @JoinColumn({ name: 'org_id' })
    organization!: Organization;

    @ManyToOne(() => User, org => org)
    @JoinColumn({ name: 'user_id' })
    user!: User;

}
