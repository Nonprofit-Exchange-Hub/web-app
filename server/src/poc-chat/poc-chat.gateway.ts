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

@WebSocketGateway({ cors: { origin: '*' } })
export class PocChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly pocChatService: PocChatService) {}

  @SubscribeMessage('createPocChat')
  async create(@MessageBody() createPocChatDto: CreatePocChatDto) {
    const message = await this.pocChatService.create(createPocChatDto);

    this.server.emit('message', message);
  }

  @SubscribeMessage('findAllPocChat')
  findAll() {
    return this.pocChatService.findAll();
  }

  @SubscribeMessage('join')
  joinRoom(@MessageBody('name') name: string, @ConnectedSocket() client: Socket) {
    return this.pocChatService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(@MessageBody('isTyping') isTyping: boolean, @ConnectedSocket() client: Socket) {
    const name = await this.pocChatService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping });
  }
}
