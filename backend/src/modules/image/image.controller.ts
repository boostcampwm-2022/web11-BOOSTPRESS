import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { JwtGuard } from '../../guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CurrentUser } from 'src/decorator';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService) {}

    // @UseGuards(JwtGuard)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @UploadedFile() file,
        @Res() res,
        @Req() req,
        // @CurrentUser() user,
        @Body() body,
    ) {
        const imageURL = await this.imageService.create(file, body);

        return res.send({ imageURL });
    }
}
