import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { EmpresaController } from './empresa.controller';
import { EmpresaService } from './empresa.service';

@Module({
  imports: [PrismaModule],
  controllers: [EmpresaController],
  providers: [
    EmpresaService,
    PrismaService,
    AuthService,
    UserService,
    JwtService,
  ],
})
export class EmpresaModule {}
