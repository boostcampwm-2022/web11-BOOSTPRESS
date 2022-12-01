import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtGuard } from '../../guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UploadImage } from './swagger';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    @ApiOperation(UploadImage.Operation)
    @ApiResponse(UploadImage._201)
    @ApiResponse(UploadImage._401)
    @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file) {
        const imageURL = await this.imageService.create(file);
        return { imageURL };
    }
}
