import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    AuthModule, 
    UserModule, 
    BlogModule, 
    PrismaModule
  ],
})
export class AppModule {}
