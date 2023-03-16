import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { DeleteResult } from 'typeorm';
import type { Request as ExpressRequest } from 'express';
import { User } from '../acccount-manager/entities/user.entity';
import { CookieAuthGuard } from '../acccount-manager/guards/cookie-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(CookieAuthGuard)
  @Post()
  async create(
    @Request() request: ExpressRequest,
    @Body() createMessageDto: CreateMessageDto,
  ): Promise<Message | HttpException> {
    const { user } = request;
    const newMessage = await this.messagesService.create(createMessageDto, user as User);
    return newMessage;
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Message> {
    return this.messagesService.findOne(+id);
  }

  // add find by user and find by transaction

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.messagesService.remove(+id);
  }
}
