import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException(`Usuário com ID: ${id}, não encontrado!`);
    }
    return foundUser;
  }

  async update(id: string, data: Prisma.UserUpdateInput): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) {
      throw new NotFoundException(`Usuário com ID: ${id}, não encontrado!`);
    }
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<User | null> {
    const removed = await this.prisma.user.delete({
      where: { id },
    });
    if (!removed) {
      throw new NotFoundException(`Usuário com ID: ${id}, não encontrado!`);
    }
    return removed;
  }
}
