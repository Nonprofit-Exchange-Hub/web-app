import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { RoomStatus } from './room-status-enum';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>) {}
  async create(createRoomDto: CreateRoomDto) {
    return this.roomRepo.save({
      transaction: { id: createRoomDto.transactionId },
      status: RoomStatus.NEW_CLAIM,
    });
  }

  findOne(id: number) {
    return this.roomRepo.findOneBy({ id });
  }

  /**
   * Checks if any rooms have this transaction as a foreign key
   * @param id the transaction to connect with this room
   * @returns range of 1 to infinity when true, 0 when non exist
   */
  transactionIsUniqueToRooms(id: number): Promise<number> {
    return this.roomRepo.countBy({ transaction: { id } });
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return this.roomRepo.update(id, { ...updateRoomDto });
  }

  remove(id: number) {
    return this.roomRepo.delete(id);
  }
}
