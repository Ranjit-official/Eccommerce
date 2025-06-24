import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { BannerService } from './banner/banner.service';
import { BrandService } from './brand/brand.service';
import { CategoryService } from './category/category.service';
import { ChatService } from './chat/chat.service';
import { OrderService } from './order/order.service';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { OrderController } from './order/order.controller';
import { ChatController } from './chat/chat.controller';
import { CategoryController } from './category/category.controller';
import { BrandController } from './brand/brand.controller';
import { BannerController } from './banner/banner.controller';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, ProductController, OrderController, ChatController, CategoryController, BrandController, BannerController, AuthController],
  providers: [AppService, UserService, AuthService, BannerService, BrandService, CategoryService, ChatService, OrderService, ProductService],
})
export class AppModule {}
