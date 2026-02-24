import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
   MongooseModule.forRoot(process.env.MONGO_URI!, {
  autoIndex: true,
}),
    AdminModule, UserModule, AuthModule, BlogModule
  ],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
