import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FallbackModule } from './fallback/fallback.module';
import { AuthModule } from './auth/auth.module';
import { BannerModule } from './banner/banner.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [ AuthModule, BannerModule, BrandModule, CategoryModule, ChatModule, OrderModule, ProductModule, UserModule, CloudinaryModule,],
  controllers: [AppController,],
  providers: [AppService, EmailService,],
})
export class AppModule {}
