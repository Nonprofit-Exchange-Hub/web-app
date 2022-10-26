import { IsOptional } from 'class-validator';

export class GetOrganizationDto {
  @IsOptional()
  search: string;

  @IsOptional()
  limit: number;

  @IsOptional()
  offset: number;
}
