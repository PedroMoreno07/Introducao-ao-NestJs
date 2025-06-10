import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [
    {
      id: 1,
      name: 'joão',
      email: 'joãozinho@gmail.com',
    },
    {
      id: 2,
      name: 'Ana',
      email: 'ana@gmail.com',
    },
  ];

  findAll(): { id: number; name: string; email: string }[] {
    return this.users;
  }
  findOne(id: number): { id: number; name: string; email: string } | object {
    const foundUser = this.users.find((u) => u.id === id);
    if (!foundUser) {
      return { mensagem: 'Usuário não encontrado!' };
    }
    return foundUser;
  }
  createUser(user: { name: string; email: string }): object {
    const newUser = {
      id: this.users.length + 1,
      name: user.name,
      email: user.email,
    };
    this.users.push(newUser);
    return {
      mensagem: `Usuário ${user.name} criado com email ${user.email}, ID:${newUser.id}`,
    };
  }
}
