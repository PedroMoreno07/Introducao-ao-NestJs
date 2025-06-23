import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserController } from './users.controller';
@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
