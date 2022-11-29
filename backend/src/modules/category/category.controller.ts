import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
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
    async read(@Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.readByUserId(id);
    }

    @ApiOperation(Create.Operation)
    @ApiResponse(Create._200)
    @UseGuards(JwtGuard)
    @Post()
    async create(@CurrentUser() user, @Body() dto: CategoryDTO) {
        return await this.categoryService.create(user, dto);
    }

    @Patch(':id')
    async update(
        @CurrentUser() user,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CategoryDTO,
    ) {
        return await this.categoryService.update(user, dto, id);
    }

    @Delete(':id')
    async delete(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.delete(user, id);
    }
}
