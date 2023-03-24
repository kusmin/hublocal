import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../src/prisma/prisma.service';
import { CreateUserDto } from '../src/user/dto/user.create.dto';
import { EditUserDto } from '../src/user/dto/user.edit.dto';
import { UserService } from '../src/user/user.service';
// Mock para o PrismaService
const prismaServiceMock = {
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: prismaServiceMock },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('criar usuario', () => {
    it('croamdp usuario com sucesso', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        name: 'Renan',
        password: 'password123',
      };

      const user = {
        id: 1,
        ...createUserDto,
      };

      (prismaService.user.create as jest.Mock).mockResolvedValue(user);

      const result = await userService.createUser(createUserDto);
      expect(prismaService.user.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });
  });

  describe('findAll', () => {
    it('retornar todos os usuarios', async () => {
      const users = [
        {
          id: 1,
          email: 'john@example.com',
          name: 'John',
          password: 'password123',
        },
        {
          id: 2,
          email: 'jane@example.com',
          name: 'Jane',
          password: 'password456',
        },
      ];

      (prismaService.user.findMany as jest.Mock).mockResolvedValue(users);

      const result = await userService.findAllUsers();
      expect(prismaService.user.findMany).toHaveBeenCalledTimes(1);
      expect(result).toEqual(
        users.map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
        })),
      );
    });
  });

  describe('retornar usuario pelo id', () => {
    it('retorna o usuario pelo id', async () => {
      const user = {
        id: 1,
        email: 'john@example.com',
        name: 'John',
        password: 'password123',
      };

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(user);

      const result = await userService.findUserById(user.id);
      expect(prismaService.user.findUnique).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });
  });

  describe('alterar o usario', () => {
    it('update do usuario e retorna o usuario alterado', async () => {
      const updateUserDto: EditUserDto = {
        email: 'mario@example.com',
        name: 'Mario',
      };

      const user = {
        id: 1,
        ...updateUserDto,
        password: 'password123',
      };

      (prismaService.user.update as jest.Mock).mockResolvedValue(user);

      const result = await userService.updateUser(user.id, updateUserDto);
      expect(prismaService.user.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });
  });

  describe('deleteUser', () => {
    it('retorna os dados do usuario deletado', async () => {
      const user = {
        id: 1,
        email: 'cesar@example.com',
        name: 'cesar',
      };

      (prismaService.user.delete as jest.Mock).mockResolvedValue(user);

      const result = await userService.deleteUser(user.id);
      expect(prismaService.user.delete).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    });
  });
});
