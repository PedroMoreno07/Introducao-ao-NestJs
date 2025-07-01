import { ApiOperation } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

class LoginDto {
  @IsString({ message: 'o nome precisa ser textual' })
  name: string;
  @IsEmail({}, { message: 'O email precisa ser válido' })
  email: string;
  @IsString({ message: 'A senha precisar ser textual.' })
  password: string;
}
