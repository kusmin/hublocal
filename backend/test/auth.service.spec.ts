import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../src/auth/auth.service';
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
        password: 'hashed_password',
      };
      userService.findByEmail = jest.fn().mockResolvedValue(testUser);
      authService.validatePassword = jest.fn().mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue('test_token');

      const result = await authService.validateUser(
        'test@example.com',
        'hashed_password',
      );

      delete testUser.password;
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
      const testUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashed_password',
      };
      userService.findByEmail = jest.fn().mockResolvedValue(testUser);
      jwtService.sign = jest.fn().mockReturnValue('test_token');

      const result = await authService.login(testUser);
      expect(result).toEqual({ access_token: 'test_token' });
    });
  });
});
