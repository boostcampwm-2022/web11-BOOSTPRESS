import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { ArticleBriefResponseDTO } from './Brief.dto';

export class ArticleListResponseDTO {
    @ApiProperty({
        description: '게시글의 내용을 포함하지 않는 정보',
        type: [ArticleBriefResponseDTO],
    })
    articles: ArticleBriefResponseDTO[];

    @ApiProperty({ description: '특정 조건을 지닌 게시글 목록의 페이지 수' })
    totalPages: number;

    static fromArticles(
        articles: Article[],
        totalPages: number,
    ): ArticleListResponseDTO {
        return {
            articles: articles.map(ArticleBriefResponseDTO.fromArticle),
            totalPages,
        };
    }
}
