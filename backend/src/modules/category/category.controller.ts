import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { CategoryService } from './category.service';
import { CategoryDTO } from './dto';
import { Create } from './swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Get(':id')
    async getAll(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.getAll(id);
    }

    @ApiOperation(Create.Operation)
    @ApiResponse(Create._200)
    @UseGuards(JwtGuard)
    @Post()
    async create(@CurrentUser() user, @Body() dto: CategoryDTO) {
        return await this.categoryService.create(user, dto);
    }
}
