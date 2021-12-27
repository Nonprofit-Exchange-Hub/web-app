import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { CookieAuthGuard } from '../auth/guards/cookie-auth.guard';
import { Message } from './entities/message.entity';
import { DeleteResult } from 'typeorm';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(CookieAuthGuard)
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messagesService.create(createMessageDto);
  }

  @UseGuards(CookieAuthGuard)
  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @UseGuards(CookieAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(+id);
  }

  // add find by user and find by transaction

  @UseGuards(CookieAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @UseGuards(CookieAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.messagesService.remove(+id);
  }
}
