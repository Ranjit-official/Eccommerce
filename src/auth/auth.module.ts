import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailService } from 'src/email/email.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService,EmailService],
    imports: [CloudinaryModule],
})
export class AuthModule {}
