import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto): Promise<Room> {
    const { transactionId } = createRoomDto;
    const transactionExists = await this.roomsService.transactionIsUniqueToRooms(transactionId);

    if (transactionExists > 0) {
      throw new BadRequestException(
        `Transaction id: ${transactionId} is already connected to a Room`,
      );
    }
    return this.roomsService.create(createRoomDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Room | HttpException> {
    const dbRecord = await this.handleNotFound(id);
    return dbRecord;
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateRoomDto: UpdateRoomDto) {
    await this.handleNotFound(id);
    return this.roomsService.update(id, updateRoomDto);
  }

  private async handleNotFound(id: number): Promise<Room> {
    const dbRoom = await this.roomsService.findOne(id);
    if (!dbRoom) {
      throw new NotFoundException(`Room with id ${id} not found`);
    }
    return dbRoom;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.handleNotFound(id);
    return this.roomsService.remove(id);
  }
}
