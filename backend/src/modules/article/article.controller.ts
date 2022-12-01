import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { ArticleService } from './article.service';
import { UpsertDTO, FilterDTO } from './dto';
import { Create, ReadOne, Remove, Update } from './swagger';

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @ApiOperation(Create.Operation)
    @ApiResponse(Create._201)
    @ApiResponse(Create._401)
    @UseGuards(JwtGuard)
    @Post()
    async create(@CurrentUser() user: User, @Body() dto: UpsertDTO) {
        return await this.articleService.create(user, dto);
    }

    @ApiOperation(ReadOne.Operation)
    @ApiResponse(ReadOne._200)
    @Get(':id')
    async readOne(@Param('id') id: number) {
        return await this.articleService.readOne(id);
    }

    @Get()
    async readMany(
        @Query(
            new ValidationPipe({
                transform: true,
                transformOptions: { enableImplicitConversion: true },
                forbidNonWhitelisted: true,
            }),
        )
        query: FilterDTO,
    ) {
        return this.articleService.readMany(query);
    }

    @ApiOperation(Update.Operation)
    @ApiResponse(Update._200)
    @ApiResponse(Update._401)
    @UseGuards(JwtGuard)
    @Patch(':id')
    async update(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpsertDTO,
    ) {
        return await this.articleService.update(user, dto, id);
    }

    @ApiOperation(Remove.Operation)
    @ApiResponse(Remove._200)
    @ApiResponse(Remove._401)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.articleService.delete(user, id);
    }
}
