import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';

@Module({
    imports: [HttpModule],
    providers: [ImageService],
    controllers: [ImageController],
})
export class ImageModule {}
