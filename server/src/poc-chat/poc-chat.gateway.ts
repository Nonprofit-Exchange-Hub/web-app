import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { PocChatService } from './poc-chat.service';
import { CreatePocChatDto } from './dto/create-poc-chat.dto';
import { Server, Socket } from 'socket.io';
import { Logger, Request, UseGuards } from '@nestjs/common';
import { WsCookieGuardGuard } from 'src/auth/guards/ws-cookie-guard.guard';

// type AuthedRequest = RequestT & { user: User };

@WebSocketGateway(3002, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'], credentials: true },
})
export class PocChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly pocChatService: PocChatService) {}

  @UseGuards(WsCookieGuardGuard)
  @SubscribeMessage('createPocChat')
  async create(
    @MessageBody() createPocChatDto: CreatePocChatDto,
    @ConnectedSocket() client: Socket,
    @Request() req: Request,
  ) {
    Logger.log(createPocChatDto, 'GATEWAY');
    Logger.log(JSON.stringify(req['user']), 'DATA.uUSER');
    const messages = await this.pocChatService.create({
      ...createPocChatDto,
      name: req['user'].firstName,
    });
    this.server.emit('message', messages);
  }

  @UseGuards(WsCookieGuardGuard)
  @SubscribeMessage('findAllPocChat')
  findAll() {
    return this.pocChatService.findAll();
  }

  @SubscribeMessage('join')
  @UseGuards(WsCookieGuardGuard)
  joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    return this.pocChatService.identify(name, client.id);
  }

  @UseGuards(WsCookieGuardGuard)
  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
    @Request() req: Request,
  ) {
    // const name = await this.pocChatService.getClientName(client.id);
    client.broadcast.emit('typing', { name: req['user'].firstName, isTyping });
  }
}
