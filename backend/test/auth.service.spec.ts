import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { AuthService } from '../src/auth/auth.service';
import { LoginDto } from '../src/auth/login.dto';
import { CreateUserDto } from '../src/user/dto/user-create.dto';
import { UserService } from '../src/user/user.service';

const mockUserService = () => ({
  findByEmail: jest.fn(),
  create: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useFactory: mockUserService },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validarUsario', () => {
    it('retornar o usario com as credenciais validas', async () => {
      const testUser = {
        id: 1,
        email: 'test@example.com',
        senha: 'hashed_password',
      };
      userService.findByEmail = jest.fn().mockResolvedValue(testUser);
      authService.validatePassword = jest.fn().mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue('test_token');

      const result = await authService.validateUser(
        'test@example.com',
        'hashed_password',
      );

      delete testUser.senha;
      expect(result).toEqual(testUser);
    });

    it('retorna null caso as credenciais sejam invalidar', async () => {
      userService.findByEmail = jest.fn().mockResolvedValue(null);

      const result = await authService.validateUser(
        'invalid@example.com',
        'invalid_password',
      );
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('No login retornar o token de acesso', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        nome: 'Renan',
        senha: 'password123',
      };

      const createdUser: User = {
        id: 1,
        email: 'test@example.com',
        nome: 'Renan',
        senha: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userService.createUser = jest.fn().mockResolvedValue(createdUser);
      userService.findByEmail = jest.fn().mockResolvedValue(createdUser);

      const newUser = await userService.createUser(createUserDto);
      expect(newUser).toBeDefined();
      expect(newUser.email).toEqual(createUserDto.email);

      authService.validateUser = jest.fn().mockResolvedValue(createdUser);

      jwtService.sign = jest.fn().mockReturnValue('test_token');

      const loginDTO: LoginDto = {
        username: createUserDto.email,
        password: createUserDto.senha,
      };
      const login = await authService.login(null, loginDTO);
      const { access_token } = login;
      expect(access_token).toEqual('test_token');
    });
  });
});
