import { All, Controller, NotFoundException, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller()
export class FallbackController {
    @All('*')
    fallback(@Req() req:Request) {
        return new NotFoundException(`Route ${req.method} ${req.url} not found` );
    }
}
