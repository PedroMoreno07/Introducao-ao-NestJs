import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { ApiBody, ApiConflictResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginResponceDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Registrar novo Usuário' })
    @ApiBody({
        type: RegisterUserDto,
        description: 'Dados necessários para o registro de um novo usuário',
        required: true,
    })
    @ApiConflictResponse({
        description: 'Conflito: Usuário já cadastrado com este email',
        type: RegisterUserDto,
    })
    @ApiResponse({
        status: 201,
        description: 'Usuário registrado com sucesso',
    })
    @ApiResponse({
        status: 400,
        description: 'Requisição inválida: Dados fornecidos não são válidos',
    })
    @ApiResponse({
        status: 500,
        description: 'Erro interno do servidor',
    })
    async register(@Body() data: RegisterUserDto) {
        return await this.authService.register(data)
    }

    @Post("login")
    @ApiOperation({
        summary: "Login de Usuário"
    })
    @ApiBody({
        type: LoginDto,
        description: "Dados necessário para login",
        required: true
    })
    @ApiConflictResponse({
        description: "Conflito: Email ou senha inválidos",
        type: LoginDto
    })
    @ApiResponse({
        status: 200,
        description: "Login realizado com sucesso",
        type: LoginResponceDto
    })
    @ApiResponse({
        status: 400,
        description: "Requisição inválida: Dados fornecidos não são válidos"
    })
    @ApiResponse({
        status: 500,
        description: "Erro interno do servidor"
    })
    async login(@Body() data: LoginDto): Promise<LoginResponceDto> {
        return this.authService.login(data)
    }
}
