import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private prisma: PrismaService
    ) {}

    async register(data: RegisterUserDto) {
        const userExists = await this.prisma.user.findUnique({
            where: {email: data.email}
    })

    if(userExists) {
        throw new ConflictException("Usuário já cadastrado com esse email.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true
        }
    })

    return newUser
}

async validateUser (email: string, password: string) {
    const user = await this.prisma.user.findUnique({
        where: { email }
    })

    if (!user) {
        throw new UnauthorizedException("Credenciais inválida.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new UnauthorizedException("Credenciais inválida.");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

}

async login (credentials: LoginDto) {
    const user = await this.validateUser(credentials.email, credentials.password)

    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    return {
        access_token: this.jwt.sign(payload)
    }
}

}