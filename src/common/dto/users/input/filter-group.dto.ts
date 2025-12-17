import { IsOptional, IsString } from 'class-validator';
import { PaginationBaseDto } from '../../pagination-base.dto';

export class FilterGroupDto extends PaginationBaseDto {
  @IsOptional()
  @IsString()
  name?: string;
  id?: number;
  admin?: boolean;
  status?: boolean;
}
