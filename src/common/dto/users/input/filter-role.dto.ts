import { IsOptional, IsString } from "class-validator";
import { PaginationBaseDto } from "../../pagination-base.dto";

export class FilterRoleDto extends PaginationBaseDto {
  @IsOptional()
  @IsString()
  name?: string;
  id?: number;
}