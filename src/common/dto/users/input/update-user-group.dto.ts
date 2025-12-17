import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateUserGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  observation: string;

  @IsBoolean()
  admin: boolean;

  @IsBoolean()
  status: boolean;

  @IsArray()
  @IsNumber({}, { each: true })
  roleIds: number[];
}
