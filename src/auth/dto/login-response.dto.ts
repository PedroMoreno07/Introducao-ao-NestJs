import { ApiOperation } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginResponceDto {
  @IsString()
  access_token: string;
}
