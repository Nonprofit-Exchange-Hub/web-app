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
import * as dotenv from 'dotenv';
import { WsCookieGuard } from '../acccount-manager/guards/ws-cookie-auth.guard';
import { TransactionsService } from 'src/transactions/transactions.service';
import { MessagesService } from 'src/messages/messages.service';
import { UsersService } from 'src/acccount-manager/user.service';
dotenv.config({ path: __dirname + '/../../.env' });

@WebSocketGateway(3002, {
  cors: { origin: process.env.SOCKET_CORS_ORIGIN, methods: ['GET', 'POST'], credentials: true },
})
export class PocChatGateway {
  @WebSocketServer()
  server: Server;
  constructor(
    private readonly pocChatService: PocChatService,
    private transactionsService: TransactionsService,
    private messagesService: MessagesService,
    private usersService: UsersService,
  ) {}

  // @UseGuards(WsCookieGuard)
  @SubscribeMessage('createPocChat')
  async create(
    @MessageBody() createPocChatDto: CreatePocChatDto,
    @ConnectedSocket() client: Socket,
    @Request() req: Request,
  ) {
    const messages = await this.pocChatService.create({
      ...createPocChatDto,
      name: req['user'].firstName,
    });
    this.server.emit('message', messages);
  }

  // @UseGuards(WsCookieGuard)
  @SubscribeMessage('findAllPocChat')
  findAll() {
    return this.pocChatService.findAll();
  }

  @SubscribeMessage('join')
  @UseGuards(WsCookieGuard)
  joinRoom(
    @MessageBody('transactionId') transactionId: number,
    @MessageBody('orgId') org_id: number,
    @ConnectedSocket() client: Socket,
    @Request() request: Request,
  ) {
    const user = request['user'];
    const isValid = this._can_user_join(user, transactionId, org_id);
    if (isValid) {
      client.join(`${transactionId}`);
      client.emit('join', { success: true });
    } else {
      client.emit('join', { success: false });
    }
  }

  @UseGuards(WsCookieGuard)
  @SubscribeMessage('message')
  async sendMessage(
    @MessageBody('text') text: string,
    @MessageBody('transactionId') transactionId: number,
    @MessageBody('orgId') org_id: number,
    @ConnectedSocket() client: Socket,
    @Request() request: Request,
  ) {
    if (client.rooms.has(`${transactionId}`)) {
      client.to(`${transactionId}`).emit('sendMessage', {
        text: text,
        sendingUserId: request['user'].id,
        sendingOrgId: org_id,
      });
    }
  }

  @SubscribeMessage('typing')
  @UseGuards(WsCookieGuard)
  typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
    @Request() req: Request,
  ) {
    Logger.log('recieved typing');
    client.emit('typing', { name: req['user'].firstName, isTyping });
  }

  async _can_user_join(user, transaction_id, org_id = null) {
    const transaction = await this.transactionsService.getTransactionById(transaction_id);
    if (!transaction) {
      return false;
    }
    if (org_id) {
      if (!user.organizations.reduce((acc, org) => org.id === org_id && acc, true)) {
        // user id does not match org_id so return false
        return false;
      }
      if (org_id !== transaction.donaterOrganizationId && org_id !== transaction.claimerId) {
        return false;
      }
    } else if (user.id !== transaction_id.donater_userId) {
      return false;
    }
    return true;
  }
}
