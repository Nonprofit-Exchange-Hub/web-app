import { IsNotEmpty } from 'class-validator';

export class ReturnPropublicaOrgDto {
  @IsNotEmpty()
  ein: string;

  @IsNotEmpty()
  name: string;
}
