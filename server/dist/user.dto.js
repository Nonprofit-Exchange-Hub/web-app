"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDTO = void 0;
const user_entity_1 = require("./user.entity");
class UserDTO {
    static from(dto) {
        const it = new UserDTO();
        it.id = dto.id;
        it.first_name = dto.first_name;
        it.last_name = dto.last_name;
        it.is_active = dto.is_active;
        return it;
    }
    static fromEntity(entity) {
        return this.from({
            id: entity.id,
            first_name: entity.first_name,
            last_name: entity.last_name,
            is_active: entity.is_active
        });
    }
    toEntity() {
        const it = new user_entity_1.User();
        it.id = this.id;
        it.first_name = this.first_name;
        it.last_name = this.last_name;
        it.is_active = this.is_active;
        return it;
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=user.dto.js.map