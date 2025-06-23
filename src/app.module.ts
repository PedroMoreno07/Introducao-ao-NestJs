import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserService } from './users/users.service';

@Module({
  imports: [UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
