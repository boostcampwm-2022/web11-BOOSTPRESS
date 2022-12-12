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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Article, User } from '@prisma/client';
import { CurrentUser } from 'src/decorator';
import { JwtGuard } from 'src/guard';
import { DatabaseCommandService } from './db.command.service';
import { DatabaseQueryService } from './db.query.service';
import {
    UpsertDTO,
    FilterDTO,
    ArticleDetailedResponseDTO,
    ArticleListResponseDTO,
    ArticleCommandResponseDTO,
} from './dto';
import { FileService } from './file.service';
import { GithubService } from './github.service';
import { Create, ReadMany, ReadOne, Remove, Update } from './swagger';

@ApiTags('article')
@Controller('article')
export class ArticleController {
    constructor(
        private readonly dbCommand: DatabaseCommandService,
        private readonly dbQuery: DatabaseQueryService,
        private readonly file: FileService,
        private readonly github: GithubService,
    ) {}

    @ApiOperation(ReadOne.Operation)
    @ApiResponse(ReadOne._200)
    @Get(':id')
    async readOne(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArticleDetailedResponseDTO> {
        const article = await this.dbQuery.readOne(id);

        let content: string = '';

        try {
            content = await this.file.read(article.id);
        } catch {
            content = await this.github.pull(article.author, article.id);
            await this.file.write(article, content);
        }

        return ArticleDetailedResponseDTO.fromArticle(article, content);
    }

    @ApiOperation(ReadMany.Operation)
    @ApiResponse(ReadMany._200)
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
    ): Promise<ArticleListResponseDTO> {
        const { articles, totalPages } = await this.dbQuery.readMany(query);
        return ArticleListResponseDTO.fromArticles(articles, totalPages);
    }

    private apply(article: Article, dto: UpsertDTO, user: User) {
        return Promise.all([
            this.file.write(article, dto.content),
            this.github.push(article, dto.content, user),
        ]);
    }

    @ApiOperation(Create.Operation)
    @ApiResponse(Create._201)
    @ApiResponse(Create._401)
    @UseGuards(JwtGuard)
    @Post()
    async create(
        @CurrentUser() user: User,
        @Body() dto: UpsertDTO,
    ): Promise<ArticleCommandResponseDTO> {
        const article = await this.dbCommand.create(user, dto);
        await this.apply(article, dto, user);
        return ArticleCommandResponseDTO.fromArticle(article);
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
    ): Promise<ArticleCommandResponseDTO> {
        const article = await this.dbCommand.update(user, dto, id);
        await this.apply(article, dto, user);
        return ArticleCommandResponseDTO.fromArticle(article);
    }

    @ApiOperation(Remove.Operation)
    @ApiResponse(Remove._200)
    @ApiResponse(Remove._401)
    @UseGuards(JwtGuard)
    @Delete(':id')
    async delete(
        @CurrentUser() user: User,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ArticleCommandResponseDTO> {
        return this.dbCommand.delete(user, id);
    }
}
