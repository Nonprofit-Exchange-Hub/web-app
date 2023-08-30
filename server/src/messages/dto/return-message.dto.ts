import { IsNotEmpty } from 'class-validator';

import { CreateMessageDto } from './create-message.dto';

export class ReturnMessageDto extends CreateMessageDto {
  @IsNotEmpty()
  id: number;
}
