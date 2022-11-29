import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ArticleDTO {
    @ApiProperty({ description: '게시글의 제목' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ description: '게시글의 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNumber()
    categoryId?: number | undefined;

    static fromArticle(article: Article, content: string): ArticleDTO {
        return {
            title: article.title,
            content,
            categoryId: article.categoryId,
        };
    }
}
