import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTag } from './swagger';
// import { CreateDTO } from './dto';
import { TagService } from './tag.service';

@ApiTags('tag')
@Controller('tag')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @ApiOperation(GetTag.Operation)
    @ApiResponse(GetTag._200)
    @Get()
    async readAll() {
        return await this.tagService.readAll();
    }

    // @Post()
    // async create(@Body() dto: CreateDTO) {
    //     return await this.tagService.create(dto);
    // }
}
