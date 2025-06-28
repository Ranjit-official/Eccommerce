import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailService } from 'src/email/email.service';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EmailService, UserService],
  imports: [CloudinaryModule, MongodbModule],
})
export class AuthModule {}
