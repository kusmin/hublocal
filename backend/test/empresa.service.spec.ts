import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Empresa } from '@prisma/client';
import { EmpresaService } from '../src/empresa/empresa.service';
import { UpdateEmpresaDto } from './../src/empresa/empresa.dto';
import { PrismaService } from './../src/prisma/prisma.service';

describe('EmpresaService', () => {
  let empresaService: EmpresaService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresaService, PrismaService],
    }).compile();

    empresaService = module.get<EmpresaService>(EmpresaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(empresaService).toBeDefined();
  });

  const empresaMock: Empresa = {
    id: 1,
    nome: 'Teste Empresa',
    website: 'http://teste-empresa.com',
    cnpj: '12345678901234',
    usuarioId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const partialEmpresaMock: any = {
    usuarioId: 1,
  };

  const userId = 1;
  const pagina = 1;
  const limite = 10;

  // Teste para o método create
  it('should create a new empresa', async () => {
    const userId = 1;
    const findUniqueSpy = jest
      .spyOn(prismaService.empresa, 'findUnique')
      .mockResolvedValueOnce(null);

    const createSpy = jest
      .spyOn(prismaService.empresa, 'create')
      .mockResolvedValueOnce(empresaMock);

    const empresa = await empresaService.create(empresaMock, userId);

    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: { cnpj: empresaMock.cnpj },
    });
    expect(createSpy).toHaveBeenCalledWith({
      data: { ...empresaMock, usuario: { connect: { id: userId } } },
    });
    expect(empresa.website).toEqual(empresaMock.website);
  });

  // Teste para o método findAll
  it('should find all empresas for a user', async () => {
    const userId = 1;
    const findManySpy = jest
      .spyOn(prismaService.empresa, 'findMany')
      .mockResolvedValueOnce([
        {
          id: 1,
          nome: 'Empresa 1',
          cnpj: '12345678901234',
          website: 'teste.com',
          usuarioId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          nome: 'Empresa 2',
          cnpj: '23456789012345',
          website: 'teste.com',
          usuarioId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

    const empresas = await empresaService.findAll(userId, pagina, limite);

    expect(findManySpy).toHaveBeenCalledWith({
      where: { usuarioId: userId },
      skip: 10,
      take: limite,
      include: { locais: true },
    });
    expect(empresas.empresas.length).toBe(2);
  });

  // Teste para o método findOne
  it('should find one empresa', async () => {
    const id = 1;
    const userId = 1;

    const validateUserSpy = jest
      .spyOn(empresaService, 'validateUser')
      .mockResolvedValueOnce(undefined);

    const findUniqueSpy = jest
      .spyOn(prismaService.empresa, 'findUnique')
      .mockResolvedValueOnce(empresaMock);

    const empresa = await empresaService.findOne(id, userId);

    expect(validateUserSpy).toHaveBeenCalledWith(userId, id);
    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: { id },
      include: { locais: true },
    });
    expect(empresa).toEqual({
      id,
      nome: 'Teste Empresa',
      website: 'http://teste-empresa.com',
      cnpj: '12345678901234',
      usuarioId: 1,
      createdAt: empresaMock.createdAt,
      updatedAt: empresaMock.updatedAt,
    });
  });
  it('should update an existing empresa', async () => {
    const id = 1;
    const userId = 1;
    const updateEmpresaDto: UpdateEmpresaDto = {
      nome: 'Empresa 1 Atualizada',
      cnpj: '12345678901234',
      website: 'teste.com',
    };

    const validateUserSpy = jest
      .spyOn(empresaService, 'validateUser')
      .mockResolvedValueOnce(undefined);

    const findUniqueSpy = jest
      .spyOn(prismaService.empresa, 'findUnique')
      .mockResolvedValueOnce({
        id,
        nome: 'Empresa 1',
        cnpj: '12345678901234',
        website: 'teste.com',
        usuarioId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    const updateSpy = jest
      .spyOn(prismaService.empresa, 'update')
      .mockResolvedValueOnce({
        ...empresaMock,
        nome: 'Empresa 1 Atualizada',
        cnpj: '12345678901234',
      });

    const updatedEmpresa = await empresaService.update(
      id,
      updateEmpresaDto,
      userId,
    );

    expect(validateUserSpy).toHaveBeenCalledWith(userId, id);
    expect(findUniqueSpy).toHaveBeenCalledWith({ where: { id } });
    expect(updateSpy).toHaveBeenCalledWith({
      where: { id },
      data: { ...updateEmpresaDto },
    });
    expect(updatedEmpresa.nome).toEqual(updateEmpresaDto.nome);
    expect(updatedEmpresa.cnpj).toEqual(updateEmpresaDto.cnpj);
  });

  // Teste para o método remove
  it('should remove an empresa', async () => {
    const id = 1;
    const userId = 1;

    const validateUserSpy = jest
      .spyOn(empresaService, 'validateUser')
      .mockResolvedValueOnce(undefined);

    const deleteSpy = jest
      .spyOn(prismaService.empresa, 'delete')
      .mockResolvedValueOnce(empresaMock);

    const removedEmpresa = await empresaService.remove(id, userId);

    expect(validateUserSpy).toHaveBeenCalledWith(userId, id);
    expect(deleteSpy).toHaveBeenCalledWith({ where: { id } });
    expect(removedEmpresa.nome).toEqual(empresaMock.nome);
    expect(removedEmpresa.id).toEqual(id);
  });

  // Teste para o método validateUser
  it('should validate user ownership of an empresa', async () => {
    const userId = 1;
    const empresaId = 1;

    const findUniqueSpy = jest
      .spyOn(prismaService.empresa, 'findUnique')
      .mockResolvedValueOnce(partialEmpresaMock);

    await empresaService.validateUser(userId, empresaId);

    expect(findUniqueSpy).toHaveBeenCalledWith({
      where: { id: empresaId },
      select: { usuarioId: true },
    });
  });

  it('should throw an UnauthorizedException when user is not the owner of an empresa', async () => {
    const userId = 1;
    const empresaId = 1;

    jest
      .spyOn(prismaService.empresa, 'findUnique')
      .mockResolvedValueOnce({ usuarioId: 2 } as Empresa);

    await expect(
      empresaService.validateUser(userId, empresaId),
    ).rejects.toThrow(UnauthorizedException);
  });
});
