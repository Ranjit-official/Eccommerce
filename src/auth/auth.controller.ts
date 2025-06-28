import {
  Controller,
  Get,
  Post,
  Param,
  Put,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
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
import mongoose from 'mongoose';
import { UserService } from 'src/user/user.service';

import * as jwt from 'jsonwebtoken';
import { JwtConfig } from 'src/common/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(registerDTO))
  async register(@Body() data: RegisterDTO) {
    try {
      const userData = await this.authService.transformUserData(data);
      console.log(userData);
      let user = await this.authService.createUser(userData);

      await this.authService.sendActivationEmail(user);

      return this.authService.register(user);
    } catch (exception) {
      exception.message =
        exception.message ||
        'Something went wrong from auth controller register';
      throw new BadRequestException(exception);
    }
  }

  @Get('/activate/:token')
  async activate(@Param('token') token: string) {
    const user = await this.userService.getSingleUserByFilter({
      activationToken: token,
    });

    const userActivated = await this.userService.updateUserById(
      user._id.toString(),
    );

    await this.authService.sendWelcomeEmail(userActivated);

    return this.authService.activationToken(userActivated);
  }

  @Get('/me')
  me() {
    return this.authService.me();
  }

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(loginDTO))
  async login(@Body() data: LoginDTO) {
    const userData = await this.userService.getSingleUserByFilter({
      email: data.email,
    });

    const isValidPassword = await bcrypt.compareSync(
      data.password,
      userData.password as string,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }
    if (
      userData.status !== STATUS.ACTIVE ||
      userData.activationToken !== null
    ) {
      throw new UnauthorizedException(
        'User is not activated Plzzz activate it first. ',
      );
    }
    console.log(JwtConfig.secret);
    const accessToken = await jwt.sign(
      {
        sub: userData._id,
        type: 'Bearer',
      },
      JwtConfig.secret,
      {
        expiresIn: '1h',
      },
    );
    const refreshToken = await jwt.sign(
      {
        sub: userData._id,
        type: 'Refresh',
      },
      JwtConfig.secret,
      {
        expiresIn: '1d',
      },
    );
    return this.authService.login({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }

  @Get('/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('/forgot-password')
  forgotPassword() {
    return this.authService.forgetPassword();
  }

  @Get('/forget-password/:token')
  forgetPassword(@Param('token') token: string) {
    return this.authService.forgetPasswordToken();
  }

  @Post('/reset-password')
  resetPasswordPost() {
    return this.authService.resetPassword();
  }

  @Post('/change-password')
  changePassword() {
    return this.authService.changePassword();
  }

  @Put('/user/:id')
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.authService.updateUserById();
  }
}
