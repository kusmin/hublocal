import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Validate } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateLocalDto, LocalDto, UpdateLocalDto } from './local.dto';
import { LocalService } from './local.service';

@ApiTags('local')
@Controller('local')
@UseGuards(JwtAuthGuard)
export class LocalController {
  constructor(private readonly localService: LocalService) {}

  @Post()
  @ApiCreatedResponse({ type: LocalDto })
  @ApiOperation({ summary: 'Cria um novo local' })
  @Validate(CreateLocalDto)
  async create(@Body() createLocalDto: CreateLocalDto): Promise<LocalDto> {
    const local = await this.localService.create(createLocalDto);
    return LocalDto.fromEntity(local);
  }

  @ApiOkResponse({ type: LocalDto })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Busca um local pelo ID' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<LocalDto> {
    const local = await this.localService.findById(Number(id));
    return LocalDto.fromEntity(local);
  }

  @Put(':id')
  @ApiOkResponse({ type: LocalDto })
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Atualiza um local existente' })
  async update(
    @Param('id') id: string,
    @Body() updateLocalDto: UpdateLocalDto,
  ): Promise<LocalDto> {
    const local = await this.localService.update(Number(id), updateLocalDto);
    return LocalDto.fromEntity(local);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiOperation({ summary: 'Remove um local existente' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.localService.delete(Number(id));
  }

  @ApiOkResponse({ type: LocalDto, isArray: true })
  @ApiOperation({ summary: 'Lista todos os locais' })
  @Get()
  async findAll(
    @Query('empresaId') empresaId?: string,
    @Query('pagina') pagina = '0',
    @Query('limite') limite = '10',
  ): Promise<{ locais: LocalDto[]; total: number }> {
    const { locais, total } = await this.localService.findAll(
      empresaId,
      parseInt(pagina),
      parseInt(limite),
    );
    return {
      locais: locais.map(LocalDto.fromEntity),
      total,
    };
  }
}
