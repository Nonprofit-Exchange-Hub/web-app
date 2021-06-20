import { User } from './user.entity';
export declare class UserDTO implements Readonly<UserDTO> {
    id: number;
    first_name: string;
    last_name: string;
    is_active: boolean;
    static from(dto: Partial<UserDTO>): UserDTO;
    static fromEntity(entity: User): UserDTO;
    toEntity(): User;
}
