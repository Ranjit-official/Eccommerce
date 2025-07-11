import { Module } from '@nestjs/common';
import { BannerController } from './banner.controller';
import { BannerService } from './banner.service';

@Module({
    controllers: [BannerController],
    providers: [BannerService],
})
export class BannerModule {}
