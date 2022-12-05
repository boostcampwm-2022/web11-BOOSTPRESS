import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { BlogService } from './blog.service';
import { PatchDTO } from './dto';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.read(id);
    }

    @Patch()
    @UseGuards(JwtGuard)
    patch(@CurrentUser() user: User, @Body() dto: PatchDTO) {
        return this.blogService.patch(user, dto);
    }
}
