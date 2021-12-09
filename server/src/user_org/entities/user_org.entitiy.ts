import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
    user_id: number;

    @Column('int')
    org_id: number;

    @Column({
        type: "enum",
        enum: ApprovalStatus,
        default: ApprovalStatus.pending
    })
    approvalStatus: ApprovalStatus;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.admin//maybe add volunteer role and use a default
    })
    role: Role;

    @ManyToOne(() => Organization, user => user)// added a one to many relationship in org and user files
    organization: Organization;

    @ManyToOne(() => User, org => org)
    user: User;

}
