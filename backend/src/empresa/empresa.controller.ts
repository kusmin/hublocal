import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LocalDto } from 'src/local/local.dto';

import { Validate } from 'class-validator';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEmpresaDto, EmpresaDto, UpdateEmpresaDto } from './empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
@UseGuards(JwtAuthGuard)
@ApiTags('empresa')
@ApiBearerAuth()
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @Validate(CreateEmpresaDto)
  @ApiOperation({ summary: 'Criar empresa' })
  @ApiCreatedResponse({
    description: 'A empresa foi criada com sucesso.',
    type: EmpresaDto,
  })
  @ApiBadRequestResponse({ description: 'Os dados enviados são inválidos.' })
  @ApiUnauthorizedResponse({ description: 'Usuário não autenticado' })
  async create(
    @Body() createEmpresaDto: CreateEmpresaDto,
    @Req() req: Request,
  ) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const loggedUser = await this.authService.getLoggedUser(token);

      const empresa = await this.empresaService.create(
        createEmpresaDto,
        loggedUser.id,
      );
      return EmpresaDto.fromEntity(empresa);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  @ApiOkResponse({ description: 'Lista de empresas.', type: [EmpresaDto] })
  @ApiUnauthorizedResponse({ description: 'Usuário não autenticado' })
  @ApiQuery({ name: 'pagina', required: false, type: Number })
  @ApiQuery({ name: 'limite', required: false, type: Number })
  async findAll(
    @Req() req: Request,
    @Query('pagina') pagina = '0',
    @Query('limite') limite = '10',
  ) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);
    const empresas = await this.empresaService.findAll(
      loggedUser.id,
      parseInt(pagina),
      parseInt(limite),
    );

    const empresasDTO = empresas.map((empresa) => {
      const locaisDto = empresa.locais.map(LocalDto.fromEntity);
      console.log('locais');
      console.log(locaisDto);
      return EmpresaDto.fromEntity(empresa, locaisDto);
    });

    return empresasDTO;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar empresa por ID' })
  @ApiOkResponse({
    description: 'A empresa foi encontrada com sucesso.',
    type: EmpresaDto,
  })
  @ApiNotFoundResponse({ description: 'A empresa não foi encontrada.' })
  @ApiUnauthorizedResponse({ description: 'Usuário não autenticado' })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    const empresa = await this.empresaService.findOne(+id, loggedUser.id);
    return EmpresaDto.fromEntity(empresa);
  }

  @Patch(':id')
  @Validate(UpdateEmpresaDto)
  @ApiOperation({ summary: 'Atualizar empresa por ID' })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar empresa' })
  @ApiUnauthorizedResponse({ description: 'Usuário não autenticado' })
  async update(
    @Param('id') id: string,
    @Body() updateEmpresaDto: UpdateEmpresaDto,
    @Req() req: Request,
  ) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    return this.empresaService.update(+id, updateEmpresaDto, loggedUser.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover empresa por ID' })
  @ApiOkResponse({ description: 'A empresa foi removida com sucesso.' })
  @ApiNotFoundResponse({ description: 'A empresa não foi encontrada.' })
  @ApiUnauthorizedResponse({ description: 'Usuário não autenticado' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    return this.empresaService.remove(+id, loggedUser.id);
  }
}
