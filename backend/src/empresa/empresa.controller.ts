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
import { Validate } from 'class-validator';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateEmpresaDto, UpdateEmpresaDto } from './empresa.dto';
import { EmpresaService } from './empresa.service';

@Controller('empresa')
@UseGuards(JwtAuthGuard)
export class EmpresaController {
  constructor(
    private readonly empresaService: EmpresaService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @Validate(CreateEmpresaDto)
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
  async findAll(@Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);
    return this.empresaService.findAll(loggedUser.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    return this.empresaService.findOne(+id, loggedUser.id);
  }

  @Patch(':id')
  @Validate(UpdateEmpresaDto)
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
  async remove(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'].split(' ')[1];
    const loggedUser = await this.authService.getLoggedUser(token);

    return this.empresaService.remove(+id, loggedUser.id);
  }
}
