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
import { Create, ReadAll, Remove, Update } from './swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @ApiOperation(ReadAll.Operation)
    @ApiResponse(ReadAll._200)
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

    @ApiOperation(Update.Operation)
    @ApiResponse(Update._200)
    @UseGuards(JwtGuard)
    @Patch(':id')
    async update(
        @CurrentUser() user,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: CategoryDTO,
    ) {
        return await this.categoryService.update(user, dto, id);
    }

    @ApiOperation(Remove.Operation)
    @ApiResponse(Remove._200)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(@CurrentUser() user, @Param('id', ParseIntPipe) id: number) {
        return await this.categoryService.delete(user, id);
    }
}
