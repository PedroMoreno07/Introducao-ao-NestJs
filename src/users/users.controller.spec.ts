import { Test, TestingModule } from "@nestjs/testing";
import { User, Role } from "@prisma/client";
import { UserService } from "./users.service";
import { UserController } from "./users.controller";
import { BadRequestException } from "@nestjs/common";
import { identity } from "rxjs";


describe("UserController", () => {
    let controller: UserController
    let userService: jest.Mocked<UserService>

    beforeEach(async () => {
        const mockUserService: jest.Mocked<UserService> = {
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn()
        } as any

    const module: TestingModule = await Test.createTestingModule({
        controllers: [UserController],
        providers: [{provide: UserService, useValue: mockUserService}]
    }).compile()

    controller = module.get<UserController>(UserController)
    userService = module.get(UserService)
    })

    it("deve listar todos os usuários", async () => {
        const list = [
            {
                id: "1",
                name: "pedro",
                email: "pedro@gmail.com",
                password: "pedro123",
                role: Role.TURISTA
            },
            {
                id: "2",
                name: "jonas",
                email: "jonas@gmail.com",
                password: "jonas123",
                role: Role.ADMIN
            },
        ]

        userService.findAll.mockResolvedValue(list)

        const result = await controller.findAll()
        expect(result).toEqual(list)
        expect(userService.findAll).toHaveBeenCalledWith()
    })

    it("deve retornar um usuário", async () => {

        const id = "1"
        const dto =
            {
                id: "1",
                name: "pedro",
                email: "pedro@gmail.com",
                password: "pedro123",
                role: Role.TURISTA
            }
        
        userService.findOne.mockResolvedValue(dto)

        const result = await controller.findOne(id)
        expect(result).toEqual(dto)
        expect(userService.findOne).toHaveBeenCalledWith(id)
    })

    it("deve atualizar o dados de um usuário", async () => {
        const id = "1"
        const dto =
            {
                id: "1",
                name: "pedro",
                email: "pedro@gmail.com",
                password: "pedro123",
                role: Role.TURISTA
            }

        userService.update.mockResolvedValue(dto)

        const result = await controller.update(id, dto)
        expect(result).toEqual(dto)
        expect(userService.update).toHaveBeenCalledWith(id, dto)
    })

    it("deve deletar um usuário", async () => {
        const id = "1"
        const dto =
            {
                id: "1",
                name: "pedro",
                email: "pedro@gmail.com",
                password: "pedro123",
                role: Role.TURISTA
            }

        userService.remove.mockResolvedValue(dto)

        const result = await controller.remove(id)
        expect(result).toEqual(dto)
        expect(userService.remove).toHaveBeenCalledWith(id)
    })

})
