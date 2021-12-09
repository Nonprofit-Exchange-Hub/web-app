import { Organization } from 'src/organizations/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

enum Role {
    admin = 'ADMIN',
    owner = 'OWNER',
    revoked = 'REVOKED'
}

enum ApprovalStatus {
    approved = 'APPROVED',
    pending = 'PENDING',
    denied = 'DENIED'
}

@Entity('user_organization')
export class User_organization {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    user_id: number;

    @Column('int')
    org_id: number;

    @Column('enum')
    approvalStatus: ApprovalStatus;

    @Column('enum')
    role: Role;

    @ManyToOne(() => User, (user) => user.organizations)
    organizations: Organization[];

    @ManyToOne(() => Organization, (org) => org.users)
    users: User[];

}
