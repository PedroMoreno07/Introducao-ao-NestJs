import { Test, TestingModule } from "@nestjs/testing";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { CloudinaryService } from "./cloudinary.service";
import { Place, placeType } from "@prisma/client"; // assumindo que o enum vem do Prisma
import { buffer } from "stream/consumers";
import { BadRequestException } from "@nestjs/common";

describe("PlaceController", () => {
  let controller: PlaceController;
  let placeService: jest.Mocked<PlaceService>;
  let cloudinaryService: jest.Mocked<CloudinaryService>

  beforeEach(async () => {
    const mockPlaceService: jest.Mocked<PlaceService> = {
      findAll: jest.fn(),
      findPaginated: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    const mockCloudinaryService: jest.Mocked<CloudinaryService> = {
      uploadImage: jest.fn(),
      deleteImage: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaceController],
      providers: [
        { provide: PlaceService, useValue: mockPlaceService },
        { provide: CloudinaryService, useValue: mockCloudinaryService },
      ],
    }).compile();

    controller = module.get<PlaceController>(PlaceController);
    placeService = module.get(PlaceService);
    cloudinaryService = module.get(CloudinaryService)
  });

  it("deve listar todos os locais", async () => {
    const locaisMock: Place[] = [
      {
        id: "uuid-1",
        name: "Bar do Zé",
        type: placeType.BAR,
        phone: "85988887777",
        latitude: -3.716,
        longitude: -38.543,
        images: [{ url: "https://img.com/bar.jpg" }],
        createdAt: new Date(),
      },
      {
        id: "uuid-2",
        name: "Hotel Central",
        type: placeType.HOTEL,
        phone: "85999996666",
        latitude: -3.720,
        longitude: -38.550,
        images: [{ url: "https://img.com/hotel.jpg" }],
        createdAt: new Date(),
      },
    ];

    placeService.findAll.mockResolvedValue(locaisMock);

    const result = await controller.findAll();
    expect(result).toEqual(locaisMock);
    expect(placeService.findAll).toHaveBeenCalledTimes(1);
  });

  it("deve listar locais paginados", async () => {
    const locaisMock = { data: [
        {
          id: "1",
          name: "Bar do Zé",
          type: placeType.BAR,
          phone: "85988887777",
          latitude: -3.716,
          longitude: -38.543,
          images: [{ url: "https://img.com/bar.jpg" }],
          createdAt: new Date(),
        },
        {
          id: "2",
          name: "Hotel Central",
          type: placeType.HOTEL,
          phone: "85999996666",
          latitude: -3.720,
          longitude: -38.550,
          images: [{ url: "https://img.com/hotel.jpg" }],
          createdAt: new Date(),
        },
      ],
      meta: {
        total: 2,
        page: 1,
        lastPage: 2
      }
      };

      placeService.findPaginated.mockResolvedValue(locaisMock)

      const result = await controller.findPaginated(1,10)
      expect(result).toEqual(locaisMock)
      expect(placeService.findPaginated).toHaveBeenCalledWith(1,10)
  })
   it("deve criar um local", async () => {
    const dto = 
        {
          name: "Bar do Zé",
          type: placeType.BAR,
          phone: "85988887777",
          latitude: -3.716,
          longitude: -38.543,
        }
    const files = { images: [{buffer: Buffer.from("img")}]} as any

    cloudinaryService.uploadImage.mockResolvedValue({
      url: "https://img", 
      public_id: "id"
      })
    
    placeService.create.mockResolvedValue({
      id: "hash", 
      ...dto, 
      images: [{
        url: "https://img", 
        public_id: "id"
      }], 
      createdAt: new Date()})

      const result = await controller.createPlace(dto as any, files)

      expect(cloudinaryService.uploadImage).toHaveBeenCalled()
      expect(placeService.create).toHaveBeenCalled()
      expect(result.id).toBe("hash")

   }) 

   it("deve lançar um erro ao criar sem imagem", async () => {
    const dto = 
        {
          name: "Bar do Zé",
          type: placeType.BAR,
          phone: "85988887777",
          latitude: -3.716,
          longitude: -38.543,
        }
    const files = { images: []} as any

    cloudinaryService.uploadImage.mockResolvedValue({
      url: "https://img", 
      public_id: "id"
      })
    
    placeService.create.mockResolvedValue({
      id: "hash", 
      ...dto, 
      images: [], 
      createdAt: new Date()})

      await expect(controller.createPlace(dto as any, files)).rejects.toThrow(BadRequestException)
      expect(cloudinaryService.uploadImage).not.toHaveBeenCalled()
      expect(placeService.create).not.toHaveBeenCalled()
   })

   it("deve atualizar um local", async () => {
    const dto = 
        {
          id: "hash",
          name: "Bar do Zé",
          type: placeType.BAR,
          phone: "85988887777",
          latitude: -3.716,
          longitude: -38.543,
        }
    const files = { images: [{buffer: Buffer.from("img")}]} as any
    const id = "hash"

    cloudinaryService.uploadImage.mockResolvedValue({
      url: "https://img", 
      public_id: "id"
      })
    
    placeService.update.mockResolvedValue({ 
      ...dto, 
      images: [{
        url: "https://img", 
        public_id: "id"
      }], 
      createdAt: new Date()})

      const result = await controller.updatePlace(dto.id, dto as any, files)
      expect(result).toMatchObject({
        ...dto,
        images: [{
          url: "https://img",
          public_id: "id"
        }]
      })
      expect(placeService.update).toHaveBeenCalled()
      expect(result.id).toBe("hash")
   })

   it("deve deletar um local", async () => {
    const id = "hash"

    placeService.delete.mockResolvedValue()

    await controller.deletePlace(id)
    expect(placeService.delete).toHaveBeenCalledWith(id)
   })
})