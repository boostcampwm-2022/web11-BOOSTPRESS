import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.read(id);
    }
}
