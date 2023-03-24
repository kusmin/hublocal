import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicAuthGuard } from './basic.guard';
import { BasicStrategy } from './basic.strategy';
import { PrismaModule } from './prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, BasicStrategy, BasicAuthGuard],
})
export class AppModule {}
