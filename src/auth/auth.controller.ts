import { Controller,Get,Post,Param, Put,Body, HttpCode,HttpStatus, UsePipes, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDTO, LoginDTO, registerDTO, RegisterDTO } from './auth.validator';
import { ZodValidationPipe } from 'src/common/validation-pipeline';
import { FileInterceptor } from '@nestjs/platform-express';
// import { fileMiddleware } from '../common/file-validator.middle';
import { diskStorage } from 'multer';
import { randomStringGenerator } from 'src/utils/helper';
import { fileMiddleware } from 'src/common/file-validator.middle';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import * as bcrypt from 'bcrypt';
import { STATUS } from 'src/common/constants/constants';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly cloudinaryService: CloudinaryService, private readonly emailService: EmailService) {}

    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ZodValidationPipe(registerDTO))
   async register(
        @Body() data: RegisterDTO,
    ) {
        const salt = await bcrypt.genSalt(12);
        data.password = await bcrypt.hash(data.password, salt);
        const {confirmPassword, ...userData} = data;
        userData.activationToken = randomStringGenerator(100);
       this.authService.sendActivationEmail(userData);
        return this.authService.register(userData );
    }

    @Get('/activate/:token')
    activate(@Param('token') token: string) {
        return this.authService.activationToken();
    }

    @Get("/me")
    me() {
        return this.authService.me();
    }

    @Post('/login')
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ZodValidationPipe(loginDTO))
    login(@Body() data : LoginDTO) {
        return this.authService.login(data);
    }

    @Get('/logout')
    
    logout() {
        return this.authService.logout();
    }

    @Post('/forgot-password')
    forgotPassword() {
        return this.authService.forgetPassword();
    }

    @Get("/forget-password/:token")
    forgetPassword(@Param('token') token: string) {
        return this.authService.forgetPasswordToken();
    }

    @Post("/reset-password")
    resetPasswordPost() {
        return this.authService.resetPassword();
    }

    @Post("/change-password")
    changePassword() {
        return this.authService.changePassword();
    }
    
    @Put('/user/:id')
    updateUser(@Param('id') id: string, @Body() body: any) {
        return this.authService.updateUserById();
    }

}
