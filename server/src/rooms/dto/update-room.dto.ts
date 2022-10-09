import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { RoomStatus } from '../room-status-enum';
import { CreateRoomDto } from './create-room.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @IsEnum(RoomStatus)
  status: RoomStatus;
}
