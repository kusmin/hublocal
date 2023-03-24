import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEmpresaDto, UpdateEmpresaDto } from './empresa.dto';
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
  @ApiResponse({ status: 201, description: 'Empresa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao criar empresa' })
  async create(
    @Body() createEmpresaDto: CreateEmpresaDto,
    @Req() req: Request,
  ) {
    try {
      const token = req.headers['authorization'].split(' ')[1];
      const loggedUser = await this.authService.getLoggedUser(token);

      return this.empresaService.create(createEmpresaDto, loggedUser.id);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as empresas' })
  @ApiResponse({ status: 200, description: 'Empresas listadas com sucesso' })
  async findAll(@Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);
    return this.empresaService.findAll(loggedUser.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar empresa por ID' })
  @ApiResponse({ status: 200, description: 'Empresa encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    return this.empresaService.findOne(+id, loggedUser.id);
  }

  @Patch(':id')
  @Validate(UpdateEmpresaDto)
  @ApiOperation({ summary: 'Atualizar empresa por ID' })
  @ApiResponse({ status: 200, description: 'Empresa atualizada com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro ao atualizar empresa' })
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
  @ApiResponse({ status: 200, description: 'Empresa removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Empresa não encontrada' })
  async remove(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    return this.empresaService.remove(+id, loggedUser.id);
  }
}
