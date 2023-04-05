import { IsNotEmpty } from 'class-validator';

export class Interests {
  @IsNotEmpty()
  names: string[];
}
