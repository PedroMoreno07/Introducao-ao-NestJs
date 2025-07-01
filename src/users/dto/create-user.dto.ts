import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  isString,
  IsString,
} from 'class-validator';

export class CreteUserDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    type: String,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name: string;
  @ApiProperty({
    description: 'Email do usuário',
    example: 'Joao@gmail.com',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  password: string;
}
