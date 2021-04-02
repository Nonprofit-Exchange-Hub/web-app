import { User } from './user.entity';

export class UserDTO implements Readonly<UserDTO> {

    id: number;
    first_name: string;
    last_name: string;
    is_active: boolean;

    public static from(dto: Partial<UserDTO>) {
        const it = new UserDTO();
        it.id = dto.id;
        it.first_name = dto.first_name;
        it.last_name = dto.last_name;
        it.is_active = dto.is_active;
        return it;
    }

    public static fromEntity(entity: User) {
        return this.from({
            id: entity.id,
            first_name: entity.first_name,
            last_name: entity.last_name,
            is_active: entity.is_active
        });
    }

    public toEntity() {
        const it = new User();
        it.id = this.id;
        it.first_name = this.first_name;
        it.last_name = this.last_name;
        it.is_active = this.is_active;
        return it;
    }
}
