import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { BlogService } from './blog.service';
import { BlogBriefResponseDTO, PatchDTO } from './dto';
import { GetBlog, PatchBlog } from './swagger';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

    @ApiOperation(GetBlog.Operation)
    @ApiResponse(GetBlog._200)
    @Get(':id')
    get(@Param('id', ParseIntPipe) id: number) {
        return this.blogService.read(id);
    }

    @ApiOperation(PatchBlog.Operation)
    @ApiResponse(PatchBlog._200)
    @Patch()
    @UseGuards(JwtGuard)
    async patch(@CurrentUser() user: User, @Body() dto: PatchDTO) {
        const result = await this.blogService.patch(user, dto);
        return BlogBriefResponseDTO.toBrief(result);
    }
}
