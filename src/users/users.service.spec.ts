import { Test, TestingModule } from "@nestjs/testing"
import { UserService } from "./users.service"
import { PrismaService } from "../prisma/prisma.service"
import { NotFoundException } from "@nestjs/common"
import { create } from "domain"


// Mock do PrismaService
// Aqui estamos criando um mock do PrismaService para simular as operações de banco de dados
const mockPrisma = {
    user: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
}

// Testes para o UsersService
// Aqui estamos criando' uma suite de testes para o UsersService, que é responsável por gerenciar usuários
// Usamos o Jest para criar mocks e verificar se as funções estão sendo chamadas corretamente
describe("UsersService", () => {
  let service: UserService;

  // Antes de cada teste, criamos uma instância do UsersService com o PrismaService mockado
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // Testes individuais
  // Aqui definimos os testes individuais para cada funcionalidade do UsersService
  it("deve criar um usuário", async () => {
    const dto = { name: "Jonas", email: "jonas@example.com", password: "123" };
    mockPrisma.user.create.mockResolvedValue(dto);

    const result = await service.create(dto as any);
    expect(result).toEqual(dto);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({ data: dto });
  });

  it("deve listar todos os usuários", async () => {
    const usuariosMock = [
      { id: 1, name: "Jonas", email: "jonas@example.com" },
      { id: 2, name: "Pedro", email: "pedro@example.com" }
    ]
  
    mockPrisma.user.findMany.mockResolvedValue(usuariosMock)
  
    const result = await service.findAll()
    expect(result).toEqual(usuariosMock)
    expect(mockPrisma.user.findMany).toHaveBeenCalledWith()
  })

  it("deve retornar o usuário por ID", async ()=>{
    const id = "1xwxewdw"
    const usuarioMock = {
       id: "1xwxewdw", name: "Jonas", email: "jonas@example.com" 
      }

      mockPrisma.user.findUnique.mockResolvedValue(usuarioMock)

      const result = await service.findOne(id)
      expect(result).toEqual(usuarioMock)
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where:{id}
      })
  })
  
  it("deve atualizar um usuário por ID", async () => {
    const id = "1xwxewdw"
    const usuarioMock = {
       id: "1xwxewdw", name: "Jonas", email: "jonas@example.com", password: "jonas123" 
      }
    
    mockPrisma.user.findUnique.mockResolvedValue(id)
    mockPrisma.user.update.mockResolvedValue(usuarioMock)

    const result = await service.update(id, usuarioMock)
    expect(result).toEqual(usuarioMock)
    expect(mockPrisma.user.update).toHaveBeenCalledWith({
      where: {id},
      data: usuarioMock
    })

  })

  it("deve deletar um usuario por ID", async () => {
    const id = "1xwxewdw"
    const usuarioMock = {
      id: "1xwxewdw", name: "Jonas", email: "jonas@example.com" 
     }

     mockPrisma.user.findUnique.mockResolvedValue(id)
     mockPrisma.user.delete.mockResolvedValue(usuarioMock)

     const result = await service.remove(id)
     expect(result).toEqual(usuarioMock)
     expect(mockPrisma.user.delete).toHaveBeenCalledWith({
      where: {id}
     })
  })

});

// Executar os  testes: npm test