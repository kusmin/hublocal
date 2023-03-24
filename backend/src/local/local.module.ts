import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LocalController } from './local.controller';
import { LocalService } from './local.service';

@Module({
  controllers: [LocalController],
  providers: [LocalService, PrismaService],
})
export class LocalModule {}
