import { Test, TestingModule } from '@nestjs/testing';
import { LocalService } from '../src/local/local.service';
import { PrismaService } from './../src/prisma/prisma.service';

describe('LocalService', () => {
  let localService: LocalService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalService, PrismaService],
    }).compile();

    localService = module.get<LocalService>(LocalService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(localService).toBeDefined();
  });
});
